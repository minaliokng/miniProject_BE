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
    const isExistUser = await this.authRepository.getUserByEmail({ email });
    if (isExistUser.length !== 0)
      throw new ApiError('이미 존재하는 이메일 입니다', 400);
    if (isExistUser.nickname === nickname)
      throw new ApiError('이미 존재하는 닉네임입니다', 400);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.register({ email, nickname, encryptedPassword });
  };

  //로그인
  userLogin = async (loginInfo) => {
    const { email, password } = await loginRequestPattern.validateAsync(
      loginInfo,
    );
    const [isExistUser] = await this.authRepository.getUserByEmail({ email });
    if (isExistUser.length === 0)
      throw new ApiError('이메일이 존재하지 않습니다.', 400);
    const decipheredPassword = await bcrypt.compare(
      password,
      isExistUser.password,
    );
    if (decipheredPassword !== true)
      throw new ApiError('비밀번호가 일치하지 않습니다.', 400);
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
    if (isExistEmail) throw new ApiError('이미 존재하는 이메일입니다.', 400);
  };
  //닉네임 중복 검사
  checkNickname = async (userNickname) => {
    const { nickname } = userNickname;
    await nicknamePattern.validateAsync(nickname);
    const [isExistNickname] = await this.authRepository.getUserByNickname({
      nickname,
    });
    if (isExistNickname) throw new ApiError('이미 존재하는 닉네임입니다.', 400);
  };
}

module.exports = AuthService;
