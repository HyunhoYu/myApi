const express = require('express');

const router = express();

router.get('/', (req, res) => {
    res.send(`${req.user.email}로 로그인 되었습니다. `);
})

module.exports = router;