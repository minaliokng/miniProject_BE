const { Router } = require('express');
const LikeController = require('../controllers/like.controller');

const router = Router();
const likeController = new LikeController();

router.post('/posts/:postId', likeController.saveLike);
router.delete('/posts/:postId', likeController.cancleLike);

module.exports = router;
