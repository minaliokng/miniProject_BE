const { Router } = require('express');
const LikeController = require('../controllers/like.controller');

const router = Router();
const likeController = new LikeController();

router.post('/', likeController.saveLike);
router.delete('/', likeController.cancleLike);

module.exports = router;
