import React, { useState } from 'react';
import { AssignmentInput } from '../types/assignment';

interface Props {
  onSubmit: (input: AssignmentInput) => void;
  loading: boolean;
}

export const InputForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [form, setForm] = useState<AssignmentInput>({
    assignmentTitle: '',
    subject: '',
    chapterArea: '',
    learningObjective: '',
    typeOfEstimation: '',
    methodOfImplementation: '',
    mainEstimator: '',
    submissionFormat: '',
    dateOfAssessment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-gray-800">수행평가 정보 입력</h2>
      
      <input name="assignmentTitle" placeholder="과제명" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="subject" placeholder="과목" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="chapterArea" placeholder="단원/영역" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <textarea name="learningObjective" placeholder="학습 목표" onChange={handleChange} 
        className="w-full p-3 border rounded h-24" required />
      
      <input name="typeOfEstimation" placeholder="평가 유형" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="methodOfImplementation" placeholder="수행 방식" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="mainEstimator" placeholder="주요 평가자" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="submissionFormat" placeholder="제출 형식" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <input name="dateOfAssessment" type="date" onChange={handleChange} 
        className="w-full p-3 border rounded" required />
      
      <button type="submit" disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? '생성 중...' : '과제 템플릿 생성'}
      </button>
    </form>
  );
};