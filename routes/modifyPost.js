const express = require('express');
const Post = require('../models/post');


const router = express.Router();

router.post('/modifyPost', async(req, res) => {
    if(req.isAuthenticated()) {
      try{
      const targetPost = await Post.findOne({where: {
        contentHead: req.body.inputHead,
        userId: req.user.id
      }});
      /*
      if( targetPost === null) {
        console.log("targetPost NOT FOUND! ");
      } else {
        console.log(`update전 targetPost: ${targetPost}`);
      }*/

      await targetPost.update({
        contentHead: req.body.contentHead,
        contentBody: req.body.contentBody
      });

      console.log(`update 후 targetPost: ${targetPost}`);
      res.send(`수정 완료! ,수정 결과 게시글 제목: ${targetPost.contentHead}, 게시글 내용: ${targetPost.contentBody}`);

    } catch(error) {
      console.error(error);
      next(error);
    }
  }


    else {
    console.log(req.isAuthenticated());
    res.send('로그인 후 이용해주세요');
    }
})


module.exports = router;

