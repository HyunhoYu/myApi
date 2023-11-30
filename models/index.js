const Sequelize = require('sequelize');
const User = require('./user');
const Post = require('./post');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db={};

const sequelize = new Sequelize(config.databse, config.username, config.password, config);

db.sequelize = sequelize;

db.User = User;
db.Post = Post;

User.initiate(sequelize);
Post.initiate(sequelize);


module.exports = db;



