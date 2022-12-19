const dataBase = require('../config/database');
class AuthRepository {
  //회원정보생성
  register = async ({ email, nickname, encryptedPassword }) => {
    await dataBase.query(
      'INSERT INTO Users(email, nickname, password) VALUES(?, ?, ?)',
      [email, nickname, encryptedPassword],
    );
  };
  //이메일 또는 닉네임으로 회원정보 검색
  getUserByEmailOrNickname = async ({ email, nickname }) => {
    const [isExistUser] = await dataBase.query(
      `SELECT * FROM Users WHERE email = '${email}' OR nickname = '${nickname}'`,
    );
    return isExistUser;
  };

  //이메일로 회원정보검색
  getUserByEmail = async ({ email }) => {
    const [isExistUser] = await dataBase.query(
      `SELECT * FROM Users WHERE email = '${email}'`,
    );
    return isExistUser;
  };
  //닉네임으로 회원정보 검색
  getUserByNickname = async ({ nickname }) => {
    const [isExistUser] = await dataBase.query(
      `SELECT * FROM Users WHERE nickname = '${nickname}'`,
    );
    return isExistUser;
  };
}

module.exports = AuthRepository;
