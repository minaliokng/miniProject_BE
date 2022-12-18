const joi = require('joi');

//회원가입 유효성 검사
exports.registerRequestPattern = joi.object().keys({
  email: joi.string().email().required(),
  nickname: joi
    .string()
    .regex(/^[a-zA-Z0-9가-힣_]{2,20}$/)
    .required(),
  password: joi.string().min(8).max(20).required(),
});
//로그인 유효성 검사
exports.loginRequestPattern = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required().min(8).max(20),
});
//해싱된 비밀번호 유효성 검사
exports.loginResponsePattern = joi
  .string()
  .regex(/^[\w\d-_]+\.[\w\d-_]+\.[\w\d-_]+$/);
