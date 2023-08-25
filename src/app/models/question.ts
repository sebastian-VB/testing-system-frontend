import { Exam } from "./exam";

export class Question{

    id: number;
    content: string;
    image: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    givenAnswer: string;
    answer: string;
    exam: Exam;
}

export class QuestionPost{

    id: number;
    content: string;
    image: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer: string;
    exam: {
        id: number;
    };
}