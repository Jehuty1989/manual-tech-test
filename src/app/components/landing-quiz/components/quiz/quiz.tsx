export enum QuizQuestionType {
  ChoiceType,
}

interface QuizOption {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export interface QuizProps {
  question: string;
  type: QuizQuestionType;
  options: QuizOption[];
}

export default function Quiz() {
  return <h1>XYZ</h1>;
}
