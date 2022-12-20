const { Router } = require('express');
const PostsController = require('../controllers/posts.controller');
const imageUploader = require('../middlewares/imageUploader');
const {
  loggedInYet: isLoggedIn,
  passLogin: getUserId,
} = require('../middlewares/auth.mddleware');

const router = Router();
const postsController = new PostsController();

router
  .route('/')
  .post(isLoggedIn, imageUploader.single('image'), postsController.createPost)
  .get(getUserId, postsController.getPosts);
router
  .route('/:postId')
  .get(getUserId, postsController.getPost)
  .patch(isLoggedIn, postsController.updatePost)
  .delete(isLoggedIn, postsController.deletePost);

module.exports = router;
