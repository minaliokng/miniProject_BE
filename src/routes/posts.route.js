const { Router } = require('express');
const PostsController = require('../controllers/posts.controller');

const router = Router();
const postsController = new PostsController();

router.post('/', postsController.createPost);
router.get('/', postsController.getPosts);

module.exports = router;
