import React from 'react';

interface Props {
  template: string;
}

export const OutputDisplay: React.FC<Props> = ({ template }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">생성된 과제 템플릿</h2>
      <div className="prose max-w-none whitespace-pre-wrap border p-4 rounded bg-gray-50">
        {template}
      </div>
      <button onClick={() => navigator.clipboard.writeText(template)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        📋 복사하기
      </button>
    </div>
  );
};