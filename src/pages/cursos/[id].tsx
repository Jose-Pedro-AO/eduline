// src/pages/cursos/[id].tsx
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Course } from '@/types';
import { useState } from 'react';
import { Play, Check, ChevronDown } from 'lucide-react';

interface CourseDetailsProps {
  course: Course;
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="pt-16">
      {/* Course Header */}
      <div className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="mt-4 text-lg">{course.description}</p>
          <div className="flex items-center mt-4">
            <span className="text-yellow-500 font-bold">{course.rating}</span>
            <div className="flex ml-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(course.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2">({course.totalStudents} alunos)</span>
          </div>
          <div className="mt-4">
            <span>Criado por </span>
            <a href="#" className="text-purple-400 hover:text-purple-300">
              {course.instructor.name}
            </a>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">O que você aprenderá</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mt-1 mr-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Conteúdo do curso</h2>
              <div className="border rounded-lg">
                {course.lessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="border-b last:border-b-0 hover:bg-gray-50"
                  >
                    <button
                      className="w-full px-4 py-3 flex items-center justify-between"
                      onClick={() => setExpandedSection(lesson.id)}
                    >
                      <div className="flex items-center">
                        <Play className="w-4 h-4 mr-3" />
                        <span>{lesson.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-3">
                          {lesson.duration}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedSection === lesson.id ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>
                    {expandedSection === lesson.id && (
                      <div className="px-4 py-3 bg-gray-50">
                        <p className="text-sm text-gray-600">
                          {lesson.description}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-white rounded-lg shadow-lg p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-4">
                  R$ {course.price.toFixed(2)}
                </div>
                <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 mb-4">
                  Comprar agora
                </button>
                <button className="w-full border border-purple-600 text-purple-600 py-3 rounded-lg font-bold hover:bg-purple-50">
                  Adicionar ao carrinho
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Aulas:</span>
                  <span>{course.totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duração:</span>
                  <span>{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nível:</span>
                  <span className="capitalize">{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  // Implementar busca do curso no Firebase
  return {
    props: {
      course: {}, // Retornar dados do curso
    },
  };
};
