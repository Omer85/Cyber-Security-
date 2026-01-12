
export enum ModuleType {
  BASICS = 'Basics',
  THREATS = 'Threats',
  DEFENSES = 'Defenses',
  PROBLEM_SOLVING = 'Problem Solving',
  AI_LAB = 'AI Lab',
  QUIZ = 'Quiz'
}

export interface SecurityScenario {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'locked' | 'available' | 'completed';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}
