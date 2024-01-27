// Handlers 
const homePage = (req,res)=>{ 
  return  res.send("Homepage")
}

const register = (req,res)=>{ 
     const { name, address, email, mobileNo, password, qualification} = req.body 
     res.send(name,email)
  }

module.exports = { 
    homePage, register
}