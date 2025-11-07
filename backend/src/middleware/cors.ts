import cors from 'cors';

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:3000',
  'http://localhost:3000,https://ai-assignment-generator-two.vercel.app' // 실제 Vercel URL로 변경
];

export const corsMiddleware = cors({
  origin: (origin, callback) => {
    // origin이 없는 경우 (Postman 등) 또는 허용 목록에 있는 경우
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ CORS blocked:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
});