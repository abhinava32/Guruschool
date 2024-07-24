const { isAuthenticated } = require("../Middlewares/auth");
const {setUser, getUser} = require('../Services/tokens');
const jwt = require('jsonwebtoken');
const students = require('../Models/students');
const bcrypt = require('bcrypt');

module.exports.updateProfile = async (req, res) => {
    const update_object = req.body;
    if(!req.user){
        return res.status(401).json({
            message: "user not authenticated!!"
        })
    }
    

    for(let column in update_object){
        const doc = await students.findById(req.user._id);
        if(column === "user_type" || column === "createdAt" || column === "updatedAt" || column === "password"){
            continue;
        }
        doc[column] = update_object[column];
        await doc.save();  
    }

    return res.status(200).json({
        message: "Profile updated successfully"
    });

}

module.exports.changePassword = async (req, res) => {

} //to be implemented

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
                
                // const token = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
                const secret = process.env.SECRET_KEY;
                const token = jwt.sign({user: user._id}, secret);

                res.cookie('auth_token', token, {
                    maxAge: 3600 * 1000*24*10, // 10 days 
                    httpOnly: true,// Accessible only by the web server
                    // secure: process.env.NODE_ENV === 'production', // Set to true in production
                    sameSite:'Strict', // Helps prevent CSRF attacks
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
                return res.status(400).json({
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

module.exports.checkAuth = (req, res) => {
    
    if(req.user){
        return res.status(200).json({
            user: user._id,
            message: "User AUTHORISED"
        })
    }
    return res.status(200).json({
        isAuthenticated: false,
        message: "user is not authenticated"
    });
}