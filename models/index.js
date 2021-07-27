const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');


// relationships and associations

// User has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Post belongs to User
Post.belongsTo(User,{
    foreignKey: 'user_id'
});

// User has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

// Comment belongs to Post 
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

// Relationship between User and Comment?
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Post, Comment };