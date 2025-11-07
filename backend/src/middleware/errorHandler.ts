import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('❌ Error:', err);
  
  // OpenAI 에러 처리
  if (err.message?.includes('OpenAI')) {
    return res.status(500).json({
      error: 'AI 서비스 연결 실패. 잠시 후 다시 시도해주세요.',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }

  // 일반 에러 처리
  res.status(err.status || 500).json({
    error: err.message || '서버 내부 오류가 발생했습니다.',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};