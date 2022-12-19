const { Router } = require('express');

const authRouter = require('./auth.route');
const postsRouter = require('./posts.route');
const likeRouter = require('./like.route');
const commentsRouter = require('./comments.route');
const rateLimiter = require('../middlewares/rateLimiter');

const router = Router();

router.use(rateLimiter); // 요청을 제한하는 미들웨어

router.get('/', (req, res) => res.json({ message: 'OK' }));
router.use('/auth', authRouter);
router.use('/', commentsRouter); //댓글 관련 모든 uri로
router.use('/posts', postsRouter);
router.use('/like', likeRouter);
router.use('/like', likeRouter);

module.exports = router;
