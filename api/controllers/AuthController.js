const jwt = require('jsonwebtoken');
const User = require("./../modules/users") 
const {check,validationResult}=require('express-validator')
const Mailer = require('./../config/mailer')

const AuthController = {
    register,
    login,
}


function validateData(field){
    switch (field) {
        case 'create':
            return [
                check('username').not().isEmpty().withMessage('email must not be empty'),
                check('password').not().isEmpty().withMessage('password is required'),
                check('password').isLength({min:6}).withMessage('password must not be less than 6 value')
            ];
            break;

            case 'login':
            return [
                check('password').not().isEmpty().withMessage("password feild is empty"),
            ];
            break;
    
        default:[]
            break;
    }
}
 


function login(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    
    // let errors = validationResult(req);

    let errors=false;
    if (errors) {
        res.status(400).json({
            global:true,
            errors,
        })
    } else {
        User.findOne({ username: username}, (err, user) => {
            if (user && user.validPassword(password)) {
                var token = user.tokenize()
                res.status(200).json({
                    success: true,
                    token,
                    // user:userFilter(user) 
                })
            }
            else {
                res.status(401).json({
                    success: false,
                    msg: "Invalid credantials"
                })

            }
        })
    }

}



function register(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // let errors = validationResult(req);
    let errors=false;
    if (errors) {
        res.status(400).json({
            global:true,
            errors,
        })
    } else {
        User.findOne({"username": username }).exec(function (err, user) {
            if (user) {
                if (user.username == username) {
                    res.status(400).json({
                        success: false,
                        msg:`username ${username} has been taken`
                    })
                } 
            } else {
                var newUser = new User({
                    username,
                    password,
                })

                newUser.password = newUser.encryptPassword(password);
                newUser.confirmationToken = newUser.setConfirmationToken()
                newUser.save(function (err) {
                    if (err) {
                        console.log('====================================');
                        console.log(err);
                        console.log('====================================');
                        res.status(400).json({
                            error: true,
                            msg: "something went wrong,please try again later",
                        })
                    }
                    else {
                        let token = newUser.tokenize()
                        res.send({ success: true, token });
                    }
                })
            }
        })
    }
}

module.exports = AuthController