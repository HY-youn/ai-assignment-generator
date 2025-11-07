import OpenAI from 'openai';
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAssignmentTemplate = async (input: any): Promise<string> => {
  const prompt = `
당신은 AI 활용 의심 방지 수행평가 설계 어시스턴트입니다.
아래 정보를 바탕으로 학생용 과제 템플릿을 생성하세요.

과제명: ${input.assignmentTitle}
과목: ${input.subject}
단원/영역: ${input.chapterArea}
학습 목표: ${input.learningObjective}
평가 유형: ${input.typeOfEstimation}
수행 방식: ${input.methodOfImplementation}
주요 평가자: ${input.mainEstimator}
제출 형식: ${input.submissionFormat}
제출 기한: ${input.dateOfAssessment}

필수 포함 요소:
1. AI 방지 5대 전략 반영
2. 개인 맥락 작성란
3. 과정 증거 제출란
4. 손글씨 확인란
5. 메타인지 기록란
6. 평가 루브릭

한국어로 Markdown 형식으로 작성하세요.
`;

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });
  const output = response.output_text;
  return output || '';
};

export const extractRecommendations = (template: string): string[] => {
  const recommendations: string[] = [];
  
  if (template.includes('개인 경험')) {
    recommendations.push('학생 본인의 구체적 사례를 3가지 이상 작성하도록 유도하세요.');
  }
  if (template.includes('손글씨')) {
    recommendations.push('핵심 개념을 손글씨로 요약하는 섹션을 추가하세요.');
  }
  if (template.includes('과정')) {
    recommendations.push('작성 과정을 날짜별로 기록하는 일지 형식을 권장합니다.');
  }
  if (template.includes('메타인지')) {
    recommendations.push('학생이 자신의 오류를 분석하는 질문을 3개 이상 제공하세요.');
  }
  
  recommendations.push('구두 발표 또는 1:1 질의응답 세션을 병행하면 AI 검증 효과가 극대화됩니다.');
  
  return recommendations;
};