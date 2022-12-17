require('dotenv').config();
require('./config/database');

const app = require('./app');
const logger = require('./config/logger');

const { PORT } = process.env;

// 서버 실행
app.listen(PORT, () => {
  logger.info(`${PORT} 포트로 서버가 열렸습니다.`);
});
