const {setUser, getUser} = require('../Services/tokens');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;
const User = require('../Models/students');


module.exports.isAuthenticated = async (req, res, next) => {
    if(!req.cookies){
        next();
    }
    console.log("checking authentication");

    const payload = jwt.verify(req.cookies.auth_token, secret);
    const user = await User.findById(payload.user);

    // const User = getUser(req.cookies?.auth_token);
    if(user){
        req.user = user;
        console.log("Authenticated user is "+req.user.name);
    }
    next();
}