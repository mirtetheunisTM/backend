const User = require('../models/User');
const passport = require('../passport/passport');

const signup = async (req, res, next) => {
    try {
        let username = req.body.username;
        let password = req.body.password;
        let user = new User({username: username});
        await user.setPassword(password);
        await user.save();
        res.json({
            "status": "success"
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }
};

const login = async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body.username, req.body.password);
        res.json({
            "status": "success",
            "data": {
                "user": user
            }
        })
    } catch (error) {
        res.status(500).json({
            "status": "error",
            "message": error.message
        })
    }

}

module.exports = {
    signup,
    login
}