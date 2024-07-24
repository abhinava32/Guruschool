const students = require('../Models/students');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require('../Services/tokens');




module.exports.addStudents = async (req, res) => {

    /*
        response code:
            1: User already exists
            2. Error
            3. successfull !
    */

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await students.findOne({email: req.body.email});
    if(user){
        return res.status(200).json({
            message: "user already exists !",
            code: 1
        });
    }

    try{
        studentObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };


        student = await students.create(studentObj);
        
        student.save();
    }
    catch{
        console.log("got error while creating student");
        return res.status(500).json({
            message: "Got some error while creating new record",
            code: 2
        });
    }
    console.log("created new student");
    return res.status(200).json({
        message: "User Created",
        code: 3
    });
    
    
}

