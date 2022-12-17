require('dotenv').config();

const app = require('./app');
const database = require('./config/database');
const logger = require('./config/logger');

const { PORT } = process.env;

// DB에 연결
database.connect((err) => {
  // 에러가 존재하면 에러 로깅
  if (err) return logger.error(`DB 연결 실패: ${err.stack}`);
  logger.info('DB 연결 성공');
  database.end(); // 연결 종료
});

// 서버 실행
app.listen(PORT, () => {
  logger.info(`${PORT} 포트로 서버가 열렸습니다.`);
});
