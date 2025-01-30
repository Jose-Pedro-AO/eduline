// src/types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  enrolledCourses: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
  };
  thumbnail: string;
  price: number;
  rating: number;
  totalStudents: number;
  totalLessons: number;
  duration: string;
  level: 'iniciante' | 'intermediário' | 'avançado';
  lessons: Lesson[];
  categories: string[];
  requirements: string[];
  whatYouWillLearn: string[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
  isCompleted?: boolean;
}
