export interface Module {
    id: number;
    title: string;
    description: string;
    videoUrl: string;
    quiz: Quiz;
  }
  
  export interface Quiz {
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
  }