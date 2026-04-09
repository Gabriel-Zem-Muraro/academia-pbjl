const db = require('../config/db');

async function listar(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const busca = req.query.busca || '';

    let where = '';
    let params = [];

    if (busca) {
      where = 'WHERE nome LIKE ? OR email LIKE ? OR cpf LIKE ?';
      const termo = `%${busca}%`;
      params = [termo, termo, termo];
    }

    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM alunos ${where}`,
      params
    );
    const total = countResult[0].total;

    const [rows] = await db.query(
      `SELECT * FROM alunos ${where} ORDER BY nome ASC LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      dados: rows,
      paginacao: {
        total,
        pagina: page,
        limite: limit,
        totalPaginas: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error('Erro ao listar alunos:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function buscarPorId(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Erro ao buscar aluno:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function criar(req, res) {
  try {
    const { nome, email, cpf, data_nascimento, telefone, genero, plano, ativo } = req.body;

    const [existe] = await db.query('SELECT id FROM alunos WHERE cpf = ?', [cpf]);
    if (existe.length > 0) {
      return res.status(409).json({ erro: 'CPF já cadastrado.' });
    }

    const [emailExiste] = await db.query('SELECT id FROM alunos WHERE email = ?', [email]);
    if (emailExiste.length > 0) {
      return res.status(409).json({ erro: 'E-mail já cadastrado.' });
    }

    const [result] = await db.query(
      `INSERT INTO alunos (nome, email, cpf, data_nascimento, telefone, genero, plano, ativo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, cpf, data_nascimento, telefone || null, genero, plano, ativo !== undefined ? ativo : 1]
    );

    const [novoAluno] = await db.query('SELECT * FROM alunos WHERE id = ?', [result.insertId]);
    res.status(201).json(novoAluno[0]);
  } catch (err) {
    console.error('Erro ao criar aluno:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { nome, email, cpf, data_nascimento, telefone, genero, plano, ativo } = req.body;

    const [alunoExiste] = await db.query('SELECT id FROM alunos WHERE id = ?', [id]);
    if (alunoExiste.length === 0) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    const [cpfDuplicado] = await db.query('SELECT id FROM alunos WHERE cpf = ? AND id != ?', [cpf, id]);
    if (cpfDuplicado.length > 0) {
      return res.status(409).json({ erro: 'CPF já cadastrado por outro aluno.' });
    }

    const [emailDuplicado] = await db.query('SELECT id FROM alunos WHERE email = ? AND id != ?', [email, id]);
    if (emailDuplicado.length > 0) {
      return res.status(409).json({ erro: 'E-mail já cadastrado por outro aluno.' });
    }

    await db.query(
      `UPDATE alunos SET nome = ?, email = ?, cpf = ?, data_nascimento = ?,
       telefone = ?, genero = ?, plano = ?, ativo = ? WHERE id = ?`,
      [nome, email, cpf, data_nascimento, telefone || null, genero, plano, ativo !== undefined ? ativo : 1, id]
    );

    const [atualizado] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
    res.json(atualizado[0]);
  } catch (err) {
    console.error('Erro ao atualizar aluno:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

async function remover(req, res) {
  try {
    const { id } = req.params;

    const [alunoExiste] = await db.query('SELECT id FROM alunos WHERE id = ?', [id]);
    if (alunoExiste.length === 0) {
      return res.status(404).json({ erro: 'Aluno não encontrado.' });
    }

    await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    res.json({ mensagem: 'Aluno removido com sucesso.' });
  } catch (err) {
    console.error('Erro ao remover aluno:', err);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
