const { Router } = require('express');
const CommentsController = require('../controllers/comments.controller');
const authMiddleware = require('../middlewares/auth.mddleware');

const router = Router();
const commentsController = new CommentsController();

router
  .get('/posts/:postId/comments', authMiddleware.passLogin, commentsController.getComments)
  .post('/posts/:postId/comments', authMiddleware.loggedInYet, commentsController.postComment)
  .patch('/comments/:commentId', authMiddleware.loggedInYet, commentsController.updateComment)
  .delete('/comments/:commentId', authMiddleware.loggedInYet, commentsController.deleteComment)

module.exports = router;
