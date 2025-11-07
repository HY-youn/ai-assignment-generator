import { Router } from 'express';
import { generateAssignmentTemplate, extractRecommendations } from '../services/openai.js';

const router = Router();

router.post('/api/generate', async (req, res, next) => {
  try {
    const input = req.body;

    // 입력 검증
    const requiredFields = [
      'assignmentTitle', 'subject', 'chapterArea', 
      'learningObjective', 'typeOfEstimation'
    ];
    
    for (const field of requiredFields) {
      if (!input[field]) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    // OpenAI로 템플릿 생성
    const generatedTemplate = await generateAssignmentTemplate(input);
    
    // 추천 사항 추출
    const recommendations = extractRecommendations(generatedTemplate);

    res.json({
      generatedTemplate,
      recommendations,
    });
  } catch (error) {
    next(error);
  }
});

export default router;