const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({ 
    name : { 
        type : String, 
        require: true
    },
    adress : { 
        type : String, 
        require: true
    }, 
    email: { 
        type : String, 
        require: true,
        unique : true        
    }, 
    password : { 
        type : String, 
        require: true
    },
    mobile_no : { 
        type : String, 
        require: true,
        unique: true
    },
    qualification : { 
        type: String, 
        require : true
    }
    
})

const EmployeeModel = mongoose.model('EmployeeModel', EmployeeSchema)

module.exports = EmployeeModel; 