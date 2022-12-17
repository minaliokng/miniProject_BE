const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const router = require('./routes');
const logger = require('./config/logger');
const {
  errorLogger,
  errorConverter,
  errorHandler,
} = require('./middlewares/error');
const { NODE_ENV } = process.env;

const app = express();

// morgan 사용
app.use(
  morgan(NODE_ENV === 'production' ? 'combined' : 'dev', {
    //
    stream: logger.stream, // morgan을 winston으로 로깅하기 위한 옵션
  }),
);
app.use(express.json()); // 바디를 파싱해주는 미들웨어
app.use(express.urlencoded({ extended: true })); // urlencoded 형식의 바디를 파싱하는 미들웨어, 안의 extended: true가 qs 모듈을 사용하도록 설정
app.use(helmet()); // HTTP 헤더를 설정해 정보 보안을 어느 정도 맡아 주는 미들웨어
app.use(cors()); // CORS 문제를 해결해주는 미들웨어 TODO: 프론트앤드 서버 배포 후 해당 도메인만 연결하도록 설정
app.use(compression()); // 들어오는 모든 요청을 압축해 적은 용량을 사용해 처리하고 응답하게 해주는 미들웨어

app.use(router); // 라우터 연결

app.use(errorLogger); // 에러 로깅 미들웨어
app.use(errorConverter); // 에러 전환 미들웨어
app.use(errorHandler); // 에러 응답 미들웨어

module.exports = app;
