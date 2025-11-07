import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { ExampleRecommender } from './components/ExampleRecommender';
import { generateAssignment } from './services/api';
import { AssignmentInput, AssignmentResponse } from './types/assignment';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AssignmentResponse | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (input: AssignmentInput) => {
    setLoading(true);
    setError('');
    try {
      const response = await generateAssignment(input);
      setResult(response);
    } catch (err: any) {
      setError(err.response?.data?.error || '생성 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">🎓 AI 방지 수행평가 생성기</h1>
          <p className="text-gray-600 mt-2">학생 제출용 과제 템플릿 자동 생성 시스템</p>
        </header>

        <InputForm onSubmit={handleSubmit} loading={loading} />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {result && (
          <>
            <OutputDisplay template={result.generatedTemplate} />
            <ExampleRecommender recommendations={result.recommendations} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;