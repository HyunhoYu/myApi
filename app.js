const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');


const signupRouter = require('./routes/signup');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');
const postRouter = require('./routes/post');
const modifyPostRouter = require('./routes/modifyPost');

const app = express();



sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });




app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret:'secret',
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', signupRouter);

app.use('/', loginRouter);

app.use('/', homeRouter);

app.use('/', postRouter);

app.use('/', modifyPostRouter);




app.use((err, req, res, next) => {
    console.error(err);
    res.send('server error');
})



app.listen(8080, () => {
    console.log("8080번 포트에서 서버 실행중");
})