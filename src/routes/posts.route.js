const { Router } = require('express');
const PostsController = require('../controllers/posts.controller');
const imageUploader = require('../middlewares/imageUploader');

const router = Router();
const postsController = new PostsController();

router.use((req, res, next) => {
  res.locals.userId = 1;
  next();
});
router.post('/', imageUploader.single('image'), postsController.createPost);
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.patch('/:postId', postsController.updatePost);
router.delete('/:postId', postsController.deletePost);

module.exports = router;
