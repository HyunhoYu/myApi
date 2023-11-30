const User = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();





router.post('/signup', async(req, res) => {
    try {
    
    const email = req.body.email;
    const password = req.body.password;
    const checkPassword = req.body.checkPassword;
    let countGolbangE = 0; // 이메일에서 @ 입력개수 세는 용도 

    if(email.length > 40) {
        return res.send('your email is too long to signup');
    }
 
    for(let i = 0; i < email.length; i++) {
        
        if(email[i] === '@') {
            countGolbangE ++;
        }
    }
    if(countGolbangE !== 1) {
        return res.send('check your how many @ in your email');
    }

    if(password !== checkPassword) {
        return res.send('Password does not match');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    
    const user = await User.create({
        email: email,
        password: hashedPassword

    });

    console.log(user);

    return res.status(200).json({message: `Thanks for signup! your email is ${email}`});

} catch(error) {
    console.error(error);
    return res.status(500).json({ message: 'Imternal Server Error'});
}


})

module.exports = router;