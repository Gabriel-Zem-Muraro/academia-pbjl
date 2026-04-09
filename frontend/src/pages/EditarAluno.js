import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import AlunoForm from '../components/AlunoForm';

export default function EditarAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [carregandoDados, setCarregandoDados] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get(`/alunos/${id}`);
        setAluno(data);
      } catch (err) {
        setErro('Aluno não encontrado.');
      } finally {
        setCarregandoDados(false);
      }
    }
    carregar();
  }, [id]);

  async function handleSubmit(dados) {
    try {
      setCarregando(true);
      setErro('');
      await api.put(`/alunos/${id}`, dados);
      navigate(`/alunos/${id}`);
    } catch (err) {
      if (err.response?.data?.erro) {
        setErro(err.response.data.erro);
      } else if (err.response?.data?.erros) {
        setErro(err.response.data.erros.join(' '));
      } else {
        setErro('Erro ao atualizar aluno.');
      }
    } finally {
      setCarregando(false);
    }
  }

  if (carregandoDados) {
    return <div className="text-center py-12 text-gray-500">Carregando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">
          &larr; Voltar para lista
        </Link>
      </div>
      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {erro}
        </div>
      )}
      {aluno && (
        <AlunoForm
          titulo="Editar Aluno"
          dadosIniciais={aluno}
          onSubmit={handleSubmit}
          carregando={carregando}
          modoEdicao={true}
        />
      )}
    </div>
  );
}