import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layout({ children }) {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-gray-900 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <span className="text-2xl">🏋️</span>
                <span className="text-white font-bold text-lg">Academia body and mind</span>
              </Link>
              <span className="text-gray-500 text-sm">—</span>
              <span className="text-gray-400 text-sm"> <span className="text-white font-semibold">Gabriel Zem Muraro</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className={linkClass('/')}>Alunos</Link>
              <Link to="/cadastro" className={linkClass('/cadastro')}>Novo Aluno</Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">{children}</main>
    </div>
  );
}
