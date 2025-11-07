import OpenAI from 'openai';
import { config } from "dotenv";
config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAssignmentTemplate = async (input: {
  assignmentTitle: string;
  subject: string;
  chapterArea: string;
  learningObjective: string;
  typeOfEstimation: string;
  methodOfImplementation: string;
  mainEstimator: string;
  submissionFormat: string;
  dateOfAssessment: string;
}): Promise<string> => {
  // 1) 방어적 보정(오타/공백)
  const clean = {
    ...input,
    typeOfEstimation: (input.typeOfEstimation || '').replace(/\s+/g, ''),
    submissionFormat: input.submissionFormat?.trim(),
  };

  // 2) 입력 JSON을 프롬프트에 "직접" 주입
  const userJSON = JSON.stringify(clean, null, 2);
  const prompt = `
#role
당신은 "AI 활용 의심 방지 기반 수행평가 학생 제출물 샘플 생성기"입니다.



#goal
아래의 TypeScript 기반 입력값 9개를 분석하여,
학생이 실제로 해당 수행평가를 수행해 제출한 것처럼 보이는
"완성된 학생 제출물 예시(AI-Avoidance Compliant Student Submission)"
를 자동 생성하세요.

#output_structure
ChatGPT는 반드시 다음의 순서대로 출력합니다:

Ⅰ. 표지 정보(assignment metadata)
Ⅱ. 과제 주제 선택 및 문제 정의
Ⅲ. 사전 지식 요약(학생 언어)
Ⅳ. 수행 과정(과제 타입에 따라 자동 생성)
Ⅴ. 결과물 또는 산출물(논술/보고서/실험/비평 등 맞춤)
Ⅵ. 개인 성찰(메타인지)
Ⅶ. 요약 슬라이드(텍스트 기반 1장 구성)
Ⅷ. 원본 증빙 요구 항목(사진·초안·버전 기록)
Ⅸ. AI 금지 선언문
Ⅹ. 제출 전 체크리스트

#rules
- 템플릿 생성이 아니라 **‘완성된 학생 제출물 예시’**를 만들어야 합니다.
- 교사가 제공하지 않은 정보는 자연스럽게 합리적으로 보완합니다.
- typeOfEstimation에 따라 결과물 스타일이 자동 조정됩니다.
- submissionFormat에 따라 산출물 형식을 연동합니다.
- 학생 말투는 자연스럽고 자기생각 중심이어야 합니다.
- ⚠️ 반드시 다음 문장을 포함해야 합니다:
  “AI 생성 문장 또는 복사·붙여넣기 사용 시 무효 처리됨.”

#user_input_format
아래처럼 9개 변수를 전달하면, ChatGPT는 즉시 학생 제출물 예시를 생성합니다.
할당받은 변수는 다음과 같습니다.
  assignmentTitle,subject,chapterArea,learningObjective,typeOfEstimation,methodOfImplementation,mainEstimator,submissionFormat,dateOfAssessment

${userJSON}

#instruction
입력값이 주어지면 위 구조에 따라
해당 과제에 가장 자연스럽고 타당한 "학생 제출물 샘플"을 생성하시오.

`;

  const response = await openai.responses.create({
    model: 'gpt-5',
    input: prompt,
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