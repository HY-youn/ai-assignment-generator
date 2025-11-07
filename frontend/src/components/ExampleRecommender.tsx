import React from 'react';

interface Props {
  recommendations: string[];
}

export const ExampleRecommender: React.FC<Props> = ({ recommendations }) => {
  if (!recommendations.length) return null;

  return (
    <div className="bg-yellow-50 p-6 rounded-lg shadow border-l-4 border-yellow-400">
      <h3 className="text-xl font-bold text-gray-800 mb-3">💡 과제 적용 예시 추천</h3>
      <ul className="space-y-2">
        {recommendations.map((rec, i) => (
          <li key={i} className="flex items-start">
            <span className="text-yellow-600 mr-2">▸</span>
            <span>{rec}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};