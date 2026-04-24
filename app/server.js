const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// 🔥 Conexão com o MySQL (AJUSTADO)
const db = mysql.createConnection({
  host: 'mysql-container-561190', // nome correto do container
  user: 'root',
  password: 'root',
  database: 'dimdim'
});

// 🔗 Teste de conexão
db.connect(err => {
  if (err) {
    console.log('Erro ao conectar no MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

// ➕ CREATE
app.post('/usuarios', (req, res) => {
  const { nome } = req.body;

  db.query(
    'INSERT INTO usuarios (nome) VALUES (?)',
    [nome],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao criar usuário');
      }
      res.send('Usuário criado com sucesso');
    }
  );
});

// 📄 READ
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Erro ao buscar usuários');
    }
    res.json(result);
  });
});

// ✏️ UPDATE
app.put('/usuarios/:id', (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE usuarios SET nome=? WHERE id=?',
    [nome, id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao atualizar usuário');
      }
      res.send('Usuário atualizado com sucesso');
    }
  );
});

// ❌ DELETE
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;

  db.query(
    'DELETE FROM usuarios WHERE id=?',
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Erro ao deletar usuário');
      }
      res.send('Usuário deletado com sucesso');
    }
  );
});

// 🚀 Start do servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});