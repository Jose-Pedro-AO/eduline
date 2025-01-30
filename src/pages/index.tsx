// src/pages/index.tsx
import { GetServerSideProps } from 'next';
import { Course } from '@/types';
import { CourseCard } from '@/components/CourseCard';

interface HomeProps {
  featuredCourses: Course[];
  categories: string[];
}

export default function Home({ featuredCourses, categories }: HomeProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-6">
              Aprenda novas habilidades hoje
            </h1>
            <p className="text-xl mb-8">
              Milhares de cursos online ministrados por especialistas. Encontre
              o curso perfeito para você.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="O que você quer aprender?"
                className="w-full px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <button className="absolute right-2 top-2 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Categorias Populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <a
                key={category}
                href={`/categorias/${category.toLowerCase()}`}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <span className="font-medium">{category}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Cursos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Comece sua jornada de aprendizado hoje
          </h2>
          <p className="text-xl mb-8">
            Junte-se a milhões de alunos de todo o mundo
          </p>
          <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-purple-700">
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Implementar busca de cursos e categorias no Firebase
  return {
    props: {
      featuredCourses: [],
      categories: [],
    },
  };
};
