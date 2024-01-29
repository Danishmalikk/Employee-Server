const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({ 
    name : { 
        type : String, 
        require: true
    },
    address : { 
        type : String, 
        require: true
    }, 
    email: { 
        type : String, 
        require: true,
        unique : true        
    }, 
    mobile_no : { 
        type : String, 
        require: true,
        unique: true
    },
    qualification : { 
        type: String, 
        require : true
    },
    hashedPassword : { 
        type : String,
        require : true
    },
    token: String
})

const EmployeeSchema = new mongoose.Schema({ 
    firstName: { 
        type: String,
        require : true,
    }, 
    lastName: { 
        type: String,
    }, 
    qualification: { 
        type: String,
        require : true,
    }, 
    address: { 
        type: String,
        require : true,
    }, 
    email: { 
        type: String,
        require : true,
    }, 
    mobile_no: { 
        type: String,
        require : true,
    }, 
    experience: { 
        type: String,
        require : true,
    }, 

})

const userModel = mongoose.model('userModel', UserSchema)
const employeeModel = mongoose.model('employeeModel', EmployeeSchema)

module.exports = { userModel, employeeModel }; 