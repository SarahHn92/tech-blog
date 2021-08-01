const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPost = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']  
                },
                {
                    model: Comment,
                    attributes: ['date', 'body']
                }
            ]
        });
        const posts = blogPost.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});