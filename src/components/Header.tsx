// src/components/Header.tsx
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-purple-600">
              EduPlatform
            </Link>
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <Link
                href="/cursos"
                className="text-gray-700 hover:text-purple-600"
              >
                Cursos
              </Link>
              <Link
                href="/instrutores"
                className="text-gray-700 hover:text-purple-600"
              >
                Instrutores
              </Link>
            </nav>
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={user.avatar || '/placeholder-avatar.png'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden md:block">{user.name}</span>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <Link
                      href="/perfil"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Meu Perfil
                    </Link>
                    <Link
                      href="/meus-cursos"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Meus Cursos
                    </Link>
                    <button
                      onClick={() => {
                        /* Implement logout */
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700"
                >
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
