const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
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
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dash', withAuth, async (req, res) => {
    try {
        const userInfo = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include : [ { model: Post }]
        });
        
        const user = userInfo.get({ plain: true });

        res.render('dash', {
            ...user,
            logged_in: true
        });
    }    
    catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dash');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/dash');
      return;
    }
  
    res.render('signup');
  });

  module.exports = router;
