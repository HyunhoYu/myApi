const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const passportLocal = require('../passport/login-strategy'); //사용하지 않고 있어도 지우면 안됨




const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if(error) {
            console.error(error);
            return next(error);
        }

        if(!user) {
            return res.send(`${info.message}`);
        }

        return req.login(user, (loginError) => {
            if(loginError) {
                console.log(user.id);
                console.log("3");
                console.error(loginError);
                return next(loginError);
            }
        
            return res.redirect('/');
        }
        );

    })(req, res, next);
}); 






module.exports = router;