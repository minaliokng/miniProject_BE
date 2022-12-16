const { Router } = require('express');

const authRouter = require('./auth.route');
const postsRouter = require('./posts.route');
const likeRouter = require('./like.route');

const router = Router();

router.get('/', (req, res) => res.json({ message: 'OK' }));
// router.use(rateLimiter);
router.use('/auth', authRouter);
router.use('/posts', postsRouter);
router.use('/like', likeRouter);

module.exports = router;
