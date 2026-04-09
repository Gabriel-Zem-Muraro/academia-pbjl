import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AlunoForm from '../components/AlunoForm';

export default function CadastroAluno() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleSubmit(dados) {
    try {
      setCarregando(true);
      setErro('');
      await api.post('/alunos', dados);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.erro) {
        setErro(err.response.data.erro);
      } else if (err.response?.data?.erros) {
        setErro(err.response.data.erros.join(' '));
      } else {
        setErro('Erro ao cadastrar aluno. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">&larr; Voltar para lista</Link>
      </div>
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{erro}</div>
      )}
      <AlunoForm titulo="Cadastrar Novo Aluno" onSubmit={handleSubmit} carregando={carregando} />
    </div>
  );
}
