const { Router } = require('express');
const CommentsController = require('../controllers/comments.controller');
const authMiddleware = require('../middlewares/auth.mddleware');

const router = Router();
const commentsController = new CommentsController();

router.get('/posts/:postId/comments', authMiddleware.passLogin, commentsController.getComments);
router.post('/posts/:postId/comments', authMiddleware.loggedInYet, commentsController.postComment);

module.exports = router;
