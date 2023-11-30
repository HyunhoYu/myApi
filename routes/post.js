const express = require('express');
const Post = require('../models/post');




const router = express.Router();

router.post('/post', async(req, res, next) => {
    if(!req.isAuthenticated()) { res.send('로그인 후 게시물 작성이 가능합니다');}
    console.log(req.user.id);
    const post = await Post.create({
        userId: req.user.id,
        contentHead: req.body.contentHead,
        contentBody: req.body.contentBody
    })

    console.log(post);
    
    res.send(`게시물 작성완료 작성하신 게시글 제목: ${req.body.contentHead}`);
    
})

module.exports = router;