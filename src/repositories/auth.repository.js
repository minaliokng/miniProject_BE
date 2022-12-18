const dataBase = require('../config/database');
class AuthRepository {
  //회원정보생성
  register = async ({ email, nickname, encryptedPassword }) => {
    await dataBase.query(
      'INSERT INTO Users(email, nickname, password) VALUES(?, ?, ?)',
      [email, nickname, encryptedPassword],
    );
  };
  //회원정보검색
  getUserByEmail = async ({ email }) => {
    const [isExistUser] = await dataBase.query(
      `SELECT * FROM Users WHERE email = '${email}'`,
    );
    return isExistUser;
  };
}

module.exports = AuthRepository;
