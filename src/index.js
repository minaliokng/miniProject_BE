require('dotenv').config();

const database = require('./config/database');
const app = require('./app');
const logger = require('./config/logger');

const { PORT } = process.env;

// DB에 연결
database.connect((err, result) => {
  if (err) return logger.error(`DB 연결 실패: ${err.stack}`);
  else logger.info('DB 연결 성공!');
});

// 서버 실행
app.listen(PORT, () => {
  logger.info(`${PORT} 포트로 서버가 열렸습니다.`);
});
