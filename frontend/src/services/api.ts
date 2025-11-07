import axios from 'axios';
import { AssignmentInput, AssignmentResponse } from '../types/assignment';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const generateAssignment = async (
  input: AssignmentInput
): Promise<AssignmentResponse> => {
  const { data } = await axios.post<AssignmentResponse>(
    `${API_BASE}/generate`,
    input
  );
  return data;
};