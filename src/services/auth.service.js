const AuthRepository = require('../repositories/auth.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { ApiError } = require('../utils/apiError');
const { JWT_SECRET_KEY } = process.env;
const {
  registerRequestPattern,
  loginRequestPattern,
  loginResponsePattern,
} = require('../validations/auth.validation');
class AuthService {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  //회원가입
  register = async (userInfo) => {
    const { email, nickname, password } =
      await registerRequestPattern.validateAsync(userInfo);
    const isExistuser = await this.authRepository.getUserByEmail({ email });
    if (isExistuser.length !== 0)
      throw new ApiError('이미 존재하는 이메일 입니다', 400);
    if (isExistuser.nickname === nickname)
      throw new ApiError('이미 존재하는 닉네임입니다', 400);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.register({ email, nickname, encryptedPassword });
  };

  //로그인
  userLogin = async (loginInfo) => {
    const { email, password } = await loginRequestPattern.validateAsync(
      loginInfo,
    );
    const [isExistuser] = await this.authRepository.getUserByEmail({ email });
    if (isExistuser.length === 0)
      throw new ApiError('이메일이 존재하지 않습니다.', 400);
    const decipheredPassword = await bcrypt.compare(
      password,
      isExistuser.password,
    );
    console.log(decipheredPassword);
    if (decipheredPassword !== true)
      throw new ApiError('비밀번호가 일치하지 않습니다.', 400);
    const token = await jwt.sign(
      { userId: isExistuser.userId },
      JWT_SECRET_KEY,
      {
        expiresIn: '1h',
      },
    );
    await loginResponsePattern.validateAsync(token);

    return token;
  };
}

module.exports = AuthService;
