CREATE DATABASE IF NOT EXISTS academia_db;
USE academia_db;

DROP TABLE IF EXISTS alunos;

CREATE TABLE alunos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  cpf VARCHAR(14) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  telefone VARCHAR(20),
  genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
  plano ENUM('Mensal', 'Trimestral', 'Semestral', 'Anual') NOT NULL DEFAULT 'Mensal',
  data_matricula DATE NOT NULL DEFAULT (CURRENT_DATE),
  ativo TINYINT(1) NOT NULL DEFAULT 1,
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO alunos (nome, email, cpf, data_nascimento, telefone, genero, plano, data_matricula, ativo) VALUES
('Ana Clara Silva', 'ana.silva@email.com', '016.243.370-07', '1998-05-14', '(41) 99876-5432', 'Feminino', 'Anual', '2024-01-10', 1),
('Bruno Oliveira', 'bruno.oliveira@email.com', '583.234.310-78', '1995-11-22', '(41) 98765-4321', 'Masculino', 'Semestral', '2024-02-15', 1),
('Carla Mendes', 'carla.mendes@email.com', '072.038.150-99', '2000-03-08', '(41) 97654-3210', 'Feminino', 'Mensal', '2024-03-01', 1),
('Diego Ferreira', 'diego.ferreira@email.com', '880.875.060-49', '1997-07-30', '(41) 96543-2109', 'Masculino', 'Trimestral', '2024-01-20', 0),
('Elena Souza', 'elena.souza@email.com', '139.073.800-02', '2001-12-05', '(41) 95432-1098', 'Feminino', 'Anual', '2024-04-05', 1),
('Felipe Santos', 'felipe.santos@email.com', '383.432.680-16', '1999-09-18', '(41) 94321-0987', 'Masculino', 'Mensal', '2024-05-12', 1),
('Gabriela Lima', 'gabriela.lima@email.com', '722.226.920-75', '1996-01-25', '(41) 93210-9876', 'Feminino', 'Semestral', '2024-02-28', 1),
('Henrique Costa', 'henrique.costa@email.com', '320.877.680-21', '2002-08-11', '(41) 92109-8765', 'Masculino', 'Trimestral', '2024-06-01', 1),
('Isabela Martins', 'isabela.martins@email.com', '812.429.750-98', '1994-04-02', '(41) 91098-7654', 'Feminino', 'Anual', '2024-01-05', 0),
('João Pedro Alves', 'joao.alves@email.com', '919.946.080-72', '2003-06-20', '(41) 90987-6543', 'Masculino', 'Mensal', '2024-07-15', 1);
