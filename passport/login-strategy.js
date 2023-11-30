const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const bcrypt = require('bcrypt');
const express = require('express');




const passportLocal = express.Router();


passport.serializeUser((user, done) => {
    done(null, user.id);
  });


passport.deserializeUser((id, done) => {
    User.findOne({ where: {id} })
        .then(user => done(null, user))
        .catch(error => done(error));
});

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false
    }, async (email, password, done) => {
        try {
 
           const user = await User.findOne({ where: {email} });
           console.log(user.email) ;
           if(!user) {
                done(null, false, {message: 'email is wrong or you have never been join us'});
           }
           
           
    
           const checkPassword = await bcrypt.compare(password, user.password);
      
           if(!checkPassword) {
                done(null, false, {message: 'password is wrong! try agian'});
           }

           done(null, user);

        } catch(error) {
            console.error(error);
            return done(error);
        }
    }));


  
module.exports = passportLocal;



