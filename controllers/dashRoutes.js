const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dash', withAuth, async (req, res) => {
    try {
        const blogPost = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']  
                },
                {
                    model: Comment,
                    attributes: ['date', 'body', 'user_id']
                }
            ]
        });
        const posts = blogPost.map((post) => post.get({ plain: true }));
        console.log(posts)
        res.render('dash', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;