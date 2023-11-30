const Sequelize = require('sequelize');



class Post extends Sequelize.Model {
    static initiate(sequelize) {
        Post.init({
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false, 
            },
            contentHead: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            contentBody: {
                type: Sequelize.STRING(200),
                allowNull: false
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
}


module.exports = Post;