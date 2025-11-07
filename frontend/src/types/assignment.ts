export interface AssignmentInput {
  assignmentTitle: string;
  subject: string;
  chapterArea: string;
  learningObjective: string;
  typeOfEstimation: string;
  methodOfImplementation: string;
  mainEstimator: string;
  submissionFormat: string;
  dateOfAssessment: string;
}

export interface AssignmentResponse {
  generatedTemplate: string;
  recommendations: string[];
}