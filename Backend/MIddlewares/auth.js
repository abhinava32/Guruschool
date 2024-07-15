const {setUser, getUser} = require('../Services/tokens');

module.exports.isAuthenticated = (req, res, next) => {
    const User = getUser(user);
    if(User){
        req.user = User;
    }
    next();
}