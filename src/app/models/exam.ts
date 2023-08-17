import { Catgeory } from "./category";

export class Exam{

    id: number;
    title: string;
    description: string;
    maxPoints: string; 
    questionNumber: string;
    active: boolean;
    category: Catgeory;
}

export class ExamPost{

    id: number;
    title: string;
    description: string;
    maxPoints: string; 
    questionNumber: string;
    active: boolean;
    category: {
        id: number
    };
}