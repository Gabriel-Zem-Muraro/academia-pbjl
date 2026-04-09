import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ListaAlunos from './pages/ListaAlunos';
import CadastroAluno from './pages/CadastroAluno';
import EditarAluno from './pages/EditarAluno';
import DetalhesAluno from './pages/DetalhesAluno';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ListaAlunos />} />
          <Route path="/cadastro" element={<CadastroAluno />} />
          <Route path="/alunos/:id" element={<DetalhesAluno />} />
          <Route path="/alunos/:id/editar" element={<EditarAluno />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
