const students = require('../Models/students');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require('../Services/tokens');


module.exports.login = async (req, res) => {
    /*
        response code:
            1: User not found
            2. Error
            3. successfull !
    */
   console.log("req body is ", req.body);
    const user = await students.findOne({email: req.body.email});
    if(user){
        bcrypt.compare(req.body.password, user.password, (err, result)=> {
            if(err){
                console.log("error in comparing password");
                return res.status(500).json({
                    message: "Got some error while comparing password",
                    code: 2
                });
            }
            else if(result){
                // res.cookie({name:'sAMPLE'});
                const token = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
                console.log("set token as ",token);
                setUser(user._id, token);
                console.log("cookie set as ",user.name, " : ", getUser(user._id));
                // res.cookie('auth_token', token,{
                //     maxAge: 3600
                // });

                res.cookie('auth_token', token, {
                    maxAge: 3600 * 1000, // 1 hour
                     httpOnly: true,// Accessible only by the web server
                    // secure: process.env.NODE_ENV === 'production', // Set to true in production
                     // Helps prevent CSRF attacks
                    path: '/' // Ensure the cookie is available on the entire site
                });

                return res.status(200).json({
                    message: "User found",
                    user_id: user._id,
                    name: user.name,
                    code: 3
                });
            }
            else{
                return res.status(200).json({
                    message: "Invalid Password",
                    code: 2
                });
            }
        })
    }
    else{
        return res.status(200).json({
            message: "User not found",
            code: 1
        });
    }
};

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

