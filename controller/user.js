const { userModel, employeeModel } = require('../model/user')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')

// Handlers 
const homePage = (req, res) => {
  return res.send("Homepage")
}

// registering the new user.......
const handleRegister = async (req, res) => {
  const { name, address, email, mobileNo, password, qualification } = req.body

  if (!(name && email && password)) {
    return res.status(400).send("Please fill all the details first.");
  }
  //checking whether user is already present or not
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).send("User already exists");
  }
  // encyrpting the password
  const encryptPassword = await bcrypt.hash(password, 10);
  // creating the new user 
  const createUser = await userModel.create({
    name: name,
    address: address,
    email: email,
    mobile_no: mobileNo,
    hashedPassword: encryptPassword,
    qualification: qualification,
  })

  createUser.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    })

}


const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!(email, password)) {
      res.status(400).send("All fields are required")
    }
    //find user in db 
    const user = await userModel.findOne({ email: email })
    //matching password    
    const validatingPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!user) {
      console.log("checking user from db", user)
      return res.status(404).send({ Message: "Please Register first" })
    } else if (user && validatingPassword) {
      return res.status(200).send({ success: true })
    }
  } catch (error) {
    console.log(error)
    res.send({ message: "User Unauthorised" })
  }


  // if (user && validatingPassword) {
  //   //generating the token
  //   const token = jwt.sign({ id: user._id }, "danish", { expiresIn: '24h' })
  //   user.token = token
  //   cookie.send("token", token, { expires: new Date(Date.now()) }).json({success: true});
  //   return res.send(user)
  // }
  // else { 
  //   res.status(400)
  //   return res.send({ message : "Wrong user email and Password"})
  // }
}

//Adding Employee
const handleEmployee = async (req, res) => {
  const { firstName, lastName, qualification, email, address, mobileNo, experience } = req.body
  const existingEmployee = await employeeModel.findOne({ email: email })


  if (existingEmployee) {
    return res.status(400).json({ message: "User already exists" });
  }
  const employee = await employeeModel.create({
    firstName: firstName,
    lastName: lastName,
    address: address,
    email: email,
    mobile_no: mobileNo,
    experience: experience,
    qualification: qualification,
  })
  employee.save()
    .then(item => {
      res.send("Employee saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
}
// showing employee on welcome page
const showEmployee = async (req, res) => {
  try {
    const alldata = await employeeModel.find();
    return res.json(alldata);
  } catch (error) {
    console.log(error);
  }
}

// editing employee 
const editEmployee = async (req, res) => {
  try {
    const { id } = req.params
    const { firstName, lastName, qualification, email, address, mobileNo, experience } = req.body
    const update = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      mobile_no: mobileNo,
      experience: experience,
      qualification: qualification,
    }
    const employee = await employeeModel.findByIdAndUpdate(id, update)
    return res.json(employee)
  } catch (error) {
    console.log(error)
  }
}
//deleting employee 
const deleteEmployee = async (req, res) => {
  // console.log(req.params.id)
  // res.send("done")
  try {
    const { id } = req.params;
    const employee = await employeeModel.findOne({
      _id: id,
    });
    const deletedEmp = await employeeModel.findByIdAndDelete({
      _id: id,
    });
    return res.json(deletedEmp);
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  homePage, handleRegister, handleLogin, handleEmployee, showEmployee, editEmployee, deleteEmployee
}