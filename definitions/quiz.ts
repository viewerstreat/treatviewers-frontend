export interface QuizParams {
  contestId: string;
  title: string;
  topPrize?: string;
  prizeRatio?: string;
  entryFee?: string;
}

export enum PLAY_STATUS {
  INIT = 'INIT',
  PAID = 'PAID',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
  ENDED = 'ENDED',
}

export interface PlayTrackerSchema {
  userId: number;
  contestId: string;
  status: string;
  currQuestionNo: number;
  totalQuestions: number;
  totalAnswered: number;
  score?: number;
  startTs?: number;
}

export interface PlayTrackerResponse {
  success: boolean;
  data: PlayTrackerSchema;
}

export interface OptionSchema {
  optionId: number;
  optionText: string;
  isSelected?: boolean;
}

export interface GetQuesResponse {
  success: boolean;
  data: {
    contestId: string;
    questionNo: number;
    questionText: string;
    options: OptionSchema[];
  };
}

export type BtnState = 'START' | 'RESUME' | 'PAY';
