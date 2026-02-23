import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// =============================================
// Middleware
// =============================================
app.use(cors({ origin: '*', credentials: true }));        // 개발 환경: 모든 origin 허용
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// =============================================
// Health Check
// =============================================
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// =============================================
// API Routes
// =============================================
app.use('/', router);

// =============================================
// 404 Handler
// =============================================
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: 'NOT_FOUND',
    message: '요청한 API 엔드포인트를 찾을 수 없습니다.',
  });
});

// =============================================
// Global Error Handler (마지막에 등록)
// =============================================
app.use(errorHandler);

export default app;
