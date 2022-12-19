const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET_KEY } = process.env;

//로그인이 안된 유저가 접근시 에러발생
const loggedInYet = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw err;
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType === 'Bearer' || tokenValue)
      res.locals.userId = jwt.verify(tokenValue, JWT_SECRET_KEY).userId;
    next();
  } catch (err) {
    next(new ApiError('로그인 후 이용 가능한 기능입니다.', 400));
  }
};

//이미 로그인 된 유저가 접근시 에러발생
const alreadyLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next();
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType === 'Bearer' || tokenValue) {
      jwt.verify(tokenValue, JWT_SECRET_KEY);
      next(new ApiError('이미 로그인이 되어있습니다', 400));
    }
    next();
  } catch (err) {
    next();
  }
};

//로그인이 안되있어도 통과
const passLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const [tokenType, tokenValue] = authorization.split(' ');
      if (tokenType === 'Bearer' || tokenValue)
        res.locals.userId = jwt.verify(tokenValue, JWT_SECRET_KEY).userId;
    }
    next();
  } catch (err) {
    next();
  }
};

module.exports = { loggedInYet, alreadyLoggedIn, passLogin };
