import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

export default function DetalhesAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get('/alunos/' + id);
        setAluno(data);
      } catch (err) {
        setErro('Aluno não encontrado.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [id]);

  async function excluir() {
    try {
      await api.delete('/alunos/' + id);
      navigate('/');
    } catch (err) {
      setErro('Erro ao excluir aluno.');
    }
  }

  function formatarData(data) {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR');
  }

  if (carregando) return <div className="text-center py-12 text-gray-500">Carregando...</div>;

  if (erro && !aluno) {
    return (
      <div>
        <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">&larr; Voltar</Link>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4 text-sm">{erro}</div>
      </div>
    );
  }

  const info = [
    { label: 'Nome', valor: aluno.nome },
    { label: 'E-mail', valor: aluno.email },
    { label: 'CPF', valor: aluno.cpf },
    { label: 'Telefone', valor: aluno.telefone || '—' },
    { label: 'Data de Nascimento', valor: formatarData(aluno.data_nascimento) },
    { label: 'Gênero', valor: aluno.genero },
    { label: 'Plano', valor: aluno.plano },
    { label: 'Data de Matrícula', valor: formatarData(aluno.data_matricula) },
    { label: 'Status', valor: aluno.ativo ? 'Ativo' : 'Inativo' },
  ];

  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm">&larr; Voltar para lista</Link>
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{erro}</div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Detalhes do Aluno</h2>
          <div className="flex gap-2">
            <Link to={'/alunos/' + id + '/editar'} className="px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">Editar</Link>
            <button onClick={() => setModal(true)} className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Excluir</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.map((item) => (
            <div key={item.label} className="py-3 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
              <p className="text-sm text-gray-800 mt-1 font-medium">{item.valor}</p>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        aberto={modal}
        titulo="Excluir Aluno"
        mensagem={'Tem certeza que deseja excluir "' + (aluno?.nome || '') + '"? Esta ação não pode ser desfeita.'}
        onConfirmar={excluir}
        onCancelar={() => setModal(false)}
      />
    </div>
  );
}
