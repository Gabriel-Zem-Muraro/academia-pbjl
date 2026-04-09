import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

export default function ListaAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [paginacao, setPaginacao] = useState({ pagina: 1, totalPaginas: 1, total: 0 });
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [modal, setModal] = useState({ aberto: false, id: null, nome: '' });

  const carregarAlunos = useCallback(async (pagina = 1) => {
    try {
      setCarregando(true);
      setErro('');
      const { data } = await api.get('/alunos', {
        params: { page: pagina, limit: 8, busca },
      });
      setAlunos(data.dados);
      setPaginacao(data.paginacao);
    } catch (err) {
      setErro('Erro ao carregar alunos. Verifique se o servidor está rodando.');
    } finally {
      setCarregando(false);
    }
  }, [busca]);

  useEffect(() => {
    const timer = setTimeout(() => carregarAlunos(1), 300);
    return () => clearTimeout(timer);
  }, [carregarAlunos]);

  async function excluirAluno() {
    try {
      await api.delete('/alunos/' + modal.id);
      setModal({ aberto: false, id: null, nome: '' });
      carregarAlunos(paginacao.pagina);
    } catch (err) {
      setErro('Erro ao excluir aluno.');
    }
  }

  function formatarData(data) {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR');
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Alunos</h1>
          <p className="text-gray-500 text-sm mt-1">{paginacao.total} aluno(s) cadastrado(s)</p>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, e-mail ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full sm:w-96 px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">{erro}</div>
      )}

      {carregando ? (
        <div className="text-center py-12 text-gray-500">Carregando...</div>
      ) : alunos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">Nenhum aluno encontrado.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Nome</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">E-mail</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Plano</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Matrícula</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-center px-4 py-3 font-semibold text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {alunos.map((aluno) => (
                  <tr key={aluno.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{aluno.nome}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{aluno.email}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">{aluno.plano}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{formatarData(aluno.data_matricula)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={'inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ' + (aluno.ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                        {aluno.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <Link to={'/alunos/' + aluno.id} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">Ver</Link>
                        <Link to={'/alunos/' + aluno.id + '/editar'} className="px-3 py-1.5 text-xs font-medium text-amber-600 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">Editar</Link>
                        <button onClick={() => setModal({ aberto: true, id: aluno.id, nome: aluno.nome })} className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Excluir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginacao.totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-gray-200">
              <button onClick={() => carregarAlunos(paginacao.pagina - 1)} disabled={paginacao.pagina <= 1} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">Anterior</button>
              <span className="text-sm text-gray-600">Página {paginacao.pagina} de {paginacao.totalPaginas}</span>
              <button onClick={() => carregarAlunos(paginacao.pagina + 1)} disabled={paginacao.pagina >= paginacao.totalPaginas} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors">Próxima</button>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        aberto={modal.aberto}
        titulo="Excluir Aluno"
        mensagem={'Tem certeza que deseja excluir "' + modal.nome + '"? Esta ação não pode ser desfeita.'}
        onConfirmar={excluirAluno}
        onCancelar={() => setModal({ aberto: false, id: null, nome: '' })}
      />
    </div>
  );
}
