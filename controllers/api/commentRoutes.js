const router = require('express').Router();
const { Comment } =require('../../models/comment');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
        console.log('Failed to fetch comments!')
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentBody = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });

        if (!commentBody) {
            res.status(404).json({ message: 'No comments to delete!' });
            return;
        } 
        
        res.status(200).json(commentBody);    
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    }   catch (err) {
        res.status(400).json(err);
  }
});

module.exports = router;


