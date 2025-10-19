export interface Option {
  value?: string;
  label: string;
  matches?: number[];
  imageSrc?: string;
}

export interface Question {
  id: number;
  text: string;
  type: "single" | "multi" | "slider";
  isImage?: boolean;
  options?: Option[];
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  questionId: string;
  order?: number;
}

export interface Restaurant {
  name: string;
  address: string;
  phone: string;
  index?: number;
}

export interface SurveyAnswer {
  questionId: string;
  response: string[];
}

export interface SurveyResponse {
  success: boolean;
  message: string;
  topRestaurants?: Restaurant[];
  surveyId?: string;
  surveyVersionId?: string;
}

export interface SurveyVersion {
  _id: string;
  name: string;
  version: number;
  createdAt: Date;
  questions: Question[];
}

export type SurveyState = "start" | "process" | "loading" | "result";