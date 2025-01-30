// src/components/CourseCard.tsx
import Link from 'next/link';
import { Course } from '@/types';
import { Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link
      href={`/cursos/${course.id}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
          BESTSELLER
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{course.instructor.name}</p>
        <div className="flex items-center mt-1">
          <span className="text-yellow-500 font-bold">{course.rating}</span>
          <div className="flex ml-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(course.rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({course.totalStudents})
          </span>
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold">
            R$ {course.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center mt-2 text-xs text-gray-600">
          <span>{course.totalLessons} aulas</span>
          <span className="mx-2">•</span>
          <span>{course.duration}</span>
          <span className="mx-2">•</span>
          <span>{course.level}</span>
        </div>
      </div>
    </Link>
  );
};
