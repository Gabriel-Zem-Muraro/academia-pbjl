import React, { useState, useEffect } from 'react';

const camposIniciais = {
  nome: '',
  email: '',
  cpf: '',
  data_nascimento: '',
  telefone: '',
  genero: '',
  plano: 'Mensal',
  ativo: 1,
};

export default function AlunoForm({ dadosIniciais, onSubmit, carregando, titulo, modoEdicao }) {
  const [form, setForm] = useState(camposIniciais);
  const [errosLocais, setErrosLocais] = useState({});

  useEffect(() => {
    if (dadosIniciais) {
      setForm({
        ...dadosIniciais,
        data_nascimento: dadosIniciais.data_nascimento
          ? dadosIniciais.data_nascimento.substring(0, 10)
          : '',
      });
    }
  }, [dadosIniciais]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrosLocais((prev) => ({ ...prev, [name]: '' }));
  }

  function formatarCPF(valor) {
    const nums = valor.replace(/\D/g, '').substring(0, 11);
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return nums.slice(0, 3) + '.' + nums.slice(3);
    if (nums.length <= 9) return nums.slice(0, 3) + '.' + nums.slice(3, 6) + '.' + nums.slice(6);
    return nums.slice(0, 3) + '.' + nums.slice(3, 6) + '.' + nums.slice(6, 9) + '-' + nums.slice(9);
  }

  function formatarTelefone(valor) {
    const nums = valor.replace(/\D/g, '').substring(0, 11);
    if (nums.length <= 2) return nums.length ? '(' + nums : '';
    if (nums.length <= 7) return '(' + nums.slice(0, 2) + ') ' + nums.slice(2);
    return '(' + nums.slice(0, 2) + ') ' + nums.slice(2, 7) + '-' + nums.slice(7);
  }

  function handleMaskedChange(e) {
    const { name, value } = e.target;
    let formatted = value;
    if (name === 'cpf') formatted = formatarCPF(value);
    if (name === 'telefone') formatted = formatarTelefone(value);
    setForm((prev) => ({ ...prev, [name]: formatted }));
    setErrosLocais((prev) => ({ ...prev, [name]: '' }));
  }

  function validar() {
    const erros = {};
    if (!form.nome || form.nome.trim().length < 3) erros.nome = 'Nome deve ter pelo menos 3 caracteres.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) erros.email = 'E-mail inválido.';
    if (!form.cpf || form.cpf.replace(/\D/g, '').length !== 11) erros.cpf = 'CPF inválido.';
    if (!form.data_nascimento) erros.data_nascimento = 'Data de nascimento obrigatória.';
    if (!form.genero) erros.genero = 'Selecione um gênero.';
    if (!form.plano) erros.plano = 'Selecione um plano.';
    return erros;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const erros = validar();
    if (Object.keys(erros).length > 0) {
      setErrosLocais(erros);
      return;
    }
    onSubmit(form);
  }

  const inputClass = (campo) =>
    'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
    (errosLocais[campo] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{titulo}</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
            <input type="text" name="nome" value={form.nome} onChange={handleChange} className={inputClass('nome')} placeholder="Nome completo" />
            {errosLocais.nome && <p className="text-red-500 text-xs mt-1">{errosLocais.nome}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className={inputClass('email')} placeholder="email@exemplo.com" />
            {errosLocais.email && <p className="text-red-500 text-xs mt-1">{errosLocais.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF *</label>
            <input type="text" name="cpf" value={form.cpf} onChange={handleMaskedChange} className={inputClass('cpf')} placeholder="000.000.000-00" />
            {errosLocais.cpf && <p className="text-red-500 text-xs mt-1">{errosLocais.cpf}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <input type="text" name="telefone" value={form.telefone} onChange={handleMaskedChange} className={inputClass('telefone')} placeholder="(41) 99999-9999" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento *</label>
            <input type="date" name="data_nascimento" value={form.data_nascimento} onChange={handleChange} className={inputClass('data_nascimento')} />
            {errosLocais.data_nascimento && <p className="text-red-500 text-xs mt-1">{errosLocais.data_nascimento}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gênero *</label>
            <select name="genero" value={form.genero} onChange={handleChange} className={inputClass('genero')}>
              <option value="">Selecione...</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
            {errosLocais.genero && <p className="text-red-500 text-xs mt-1">{errosLocais.genero}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Plano *</label>
            <select name="plano" value={form.plano} onChange={handleChange} className={inputClass('plano')}>
              <option value="Mensal">Mensal</option>
              <option value="Trimestral">Trimestral</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
            {errosLocais.plano && <p className="text-red-500 text-xs mt-1">{errosLocais.plano}</p>}
          </div>
          {modoEdicao && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="ativo" value={form.ativo} onChange={handleChange} className={inputClass('ativo')}>
                <option value={1}>Ativo</option>
                <option value={0}>Inativo</option>
              </select>
            </div>
          )}
        </div>
        <div className="pt-4">
          <button
            type="submit"
            disabled={carregando}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {carregando ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}