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

const { promisify } = require('util');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        User.authenticate()(username, password, (err, user, info) => {
            if (err) {
                return res.status(500).json({
                    status: "error",
                    message: "An error occurred during authentication",
                });
            }

            if (!user) {
                return res.status(401).json({
                    status: "fail",
                    message: info.message || "Invalid username or password",
                });
            }

            res.json({
                status: "success",
                data: {
                    user: {
                        id: user._id,
                        username: user.username,
                    },
                },
            });
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};



module.exports = {
    signup,
    login
}