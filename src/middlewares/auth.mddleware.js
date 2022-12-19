const jwt = require('jsonwebtoken');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET_KEY } = process.env;

//로그인이 안된 유저가 접근시 에러발생
const loggedInYet = async (req, res, next) => {
  const { authorization } = req.headers;
  const [tokenType, tokenValue] = authorization.split(' ');
  try {
    if (tokenType === Bearer || tokenValue)
      res.locals.user = jwt.verify(tokenValue, JWT_SECRET_KEY);
    next();
  } catch (err) {
    throw new ApiError('로그인 후 이용 가능한 기능입니다.', 400);
  }
};

//이미 로그인 된 유저가 접근시 에러발생
const alreadyLoggedIn = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next();
    const [tokenType, tokenValue] = authorization.split(' ');
    if (tokenType === Bearer || tokenValue)
      jwt.verify(tokenValue, JWT_SECRET_KEY);
    throw new ApiError('이미 로그인이 되어있습니다', 400);
  } catch (err) {
    throw new ApiError('로그인이 유효하지 않습니다.', 400);
  }
};

module.exports = { loggedInYet, alreadyLoggedIn };
