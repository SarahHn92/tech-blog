const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const blogPosts = await Post.findAll({
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
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogPost) {
      res.status(404).json({ message: 'No blogpost found with this id!' });
      return;
    }

    res.status(200).json(blogPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  module.exports = router;
