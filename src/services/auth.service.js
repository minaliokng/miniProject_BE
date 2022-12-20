const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET_KEY } = process.env;
const {
  registerRequestPattern,
  loginRequestPattern,
  loginResponsePattern,
  emailPattern,
  nicknamePattern,
} = require('../validations/auth.validation');
class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  //회원가입
  register = async (userInfo) => {
    const { email, nickname, password } =
      await registerRequestPattern.validateAsync(userInfo);
    const isExistUser = await this.authRepository.getUserByEmailOrNickname({
      email,
      nickname,
    });
    if (isExistUser[0]) throw new ApiError('중복된 이메일 또는 닉네임', 400);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.register({ email, nickname, encryptedPassword });
  };

  //로그인
  userLogin = async (loginInfo) => {
    const { email, password } = await loginRequestPattern.validateAsync(
      loginInfo,
    );
    const [isExistUser] = await this.authRepository.getUserByEmail({ email });
    if (!isExistUser) throw new ApiError('이메일 또는 비밀번호 불일치', 401);
    const decipheredPassword = await bcrypt.compare(
      password,
      isExistUser.password,
    );
    if (decipheredPassword !== true)
      throw new ApiError('이메일 또는 비밀번호 불일치', 401);
    const token = await jwt.sign(
      { userId: isExistUser.userId },
      JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );
    await loginResponsePattern.validateAsync(token);

    return token;
  };

  //이메일 중복 검사
  checkEmail = async (userEmail) => {
    const { email } = userEmail;
    await emailPattern.validateAsync(email);
    const [isExistEmail] = await this.authRepository.getUserByEmail({
      email,
    });
    if (isExistEmail) return false;
    else return true;
  };
  //닉네임 중복 검사
  checkNickname = async (userNickname) => {
    const { nickname } = userNickname;
    await nicknamePattern.validateAsync(nickname);
    const [isExistNickname] = await this.authRepository.getUserByNickname({
      nickname,
    });
    if (isExistNickname) return false;
    else return true;
  };
}

module.exports = AuthService;
