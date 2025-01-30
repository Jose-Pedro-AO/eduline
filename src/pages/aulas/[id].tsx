// src/pages/aulas/[id].tsx
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Course, Lesson } from '@/types';
import { useState } from 'react';
import { ChevronLeft, Menu } from 'lucide-react';

interface LessonViewProps {
  course: Course;
  currentLesson: Lesson;
}

export default function LessonView({ course, currentLesson }: LessonViewProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-white border-b flex items-center px-4 justify-between">
        <button
          onClick={() => router.push(`/cursos/${course.id}`)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Voltar para o curso
        </button>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video Player */}
          <div className="relative w-full bg-black aspect-video">
            <iframe
              src={currentLesson.videoUrl}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <h1 className="text-2xl         
                    <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
            <p className="text-gray-600">{currentLesson.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 fixed lg:relative right-0 w-80 h-full bg-white border-l transform transition-transform duration-200 ease-in-out overflow-hidden flex flex-col`}
        >
          <div className="p-4 border-b">
            <h2 className="font-bold text-lg">Conteúdo do curso</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {course.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => router.push(`/aulas/${lesson.id}`)}
                className={`w-full text-left p-4 hover:bg-gray-50 flex items-start space-x-3 border-b ${
                  lesson.id === currentLesson.id ? 'bg-purple-50' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 ${
                    lesson.isCompleted
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}
                >
                  {lesson.isCompleted && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      lesson.id === currentLesson.id ? 'text-purple-600' : ''
                    }`}
                  >
                    {lesson.title}
                  </p>
                  <p className="text-sm text-gray-500">{lesson.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Implementar busca da aula e curso no Firebase
  return {
    props: {
      course: {},
      currentLesson: {}
    }
  };
};