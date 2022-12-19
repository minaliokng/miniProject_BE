const AuthService = require('../services/auth.service');

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  //회원가입
  register = async (req, res, next) => {
    try {
      const userInfo = { ...req.body };
      await this.authService.register(userInfo);
      return res.status(201).json({ message: '회원가입이 완료되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  userLogin = async (req, res, next) => {
    try {
      const userInfo = { ...req.body };
      const token = await this.authService.userLogin(userInfo);
      res.header('token', token);
      res.status(200).json({ message: '로그인이 완료되었습니다.' });
    } catch (err) {
      next(err);
    }
  };

  //이메일 중복 검사
  checkEmail = async (req, res, next) => {
    try {
      const userEmail = req.body;
      await this.authService.checkEmail(userEmail);
      res.status(200).json({ message: '사용 가능한 이메일입니다.' });
    } catch (err) {
      next(err);
    }
  };

  //닉네임 중복 검사
  checkNickname = async (req, res, next) => {
    try {
      const userNickname = req.body;
      await this.authService.checkNickname(userNickname);
      res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
