function validarCPF(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cleaned[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cleaned[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cleaned[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== parseInt(cleaned[10])) return false;

  return true;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarAluno(req, res, next) {
  const { nome, email, cpf, data_nascimento, genero, plano } = req.body;
  const erros = [];

  if (!nome || nome.trim().length < 3) {
    erros.push('Nome deve ter pelo menos 3 caracteres.');
  }
  if (!email || !validarEmail(email)) {
    erros.push('E-mail inválido.');
  }
  if (!cpf || !validarCPF(cpf)) {
    erros.push('CPF inválido.');
  }
  if (!data_nascimento) {
    erros.push('Data de nascimento é obrigatória.');
  }

  const generosValidos = ['Masculino', 'Feminino', 'Outro'];
  if (!genero || !generosValidos.includes(genero)) {
    erros.push('Gênero inválido. Valores aceitos: Masculino, Feminino, Outro.');
  }

  const planosValidos = ['Mensal', 'Trimestral', 'Semestral', 'Anual'];
  if (!plano || !planosValidos.includes(plano)) {
    erros.push('Plano inválido. Valores aceitos: Mensal, Trimestral, Semestral, Anual.');
  }

  if (erros.length > 0) {
    return res.status(400).json({ erros });
  }

  next();
}

module.exports = { validarAluno };
