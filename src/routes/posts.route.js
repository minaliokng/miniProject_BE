const { Router } = require('express');
const PostsController = require('../controllers/posts.controller');

const router = Router();
const postsController = new PostsController();

router.post('/', postsController.createPost);
router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPost);
router.patch('/:postId', postsController.updatePost);
router.delete('/:postId', postsController.deletePost);

module.exports = router;
