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
      return res.status(201).json({ message: '가입 완료.' });
    } catch (err) {
      next(err);
    }
  };

  //로그인
  userLogin = async (req, res, next) => {
    try {
      const userInfo = { ...req.body };
      const token = await this.authService.userLogin(userInfo);
      res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  };

  //이메일 중복 검사
  checkEmail = async (req, res, next) => {
    try {
      const userEmail = req.body;
      const existEmail = await this.authService.checkEmail(userEmail);
      res.status(200).json({ result: existEmail });
    } catch (err) {
      next(err);
    }
  };

  //닉네임 중복 검사
  checkNickname = async (req, res, next) => {
    try {
      const userNickname = req.body;
      const existNickname = await this.authService.checkNickname(userNickname);
      res.status(200).json({ result: existNickname });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
