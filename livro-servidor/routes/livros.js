const express = require('express');
const router = express.Router();
const LivroDAO = require('../modelo/livro-dao');

router.get('/', async (req, res) => {
  const livros = await LivroDAO.obterLivros();
  res.json(livros);
});

router.post('/', async (req, res) => {
  const livro = req.body;
  const novoLivro = await LivroDAO.incluir(livro);
  if (novoLivro) {
    res.status(201).json({ mensagem: 'Livro incluído com sucesso' });
  } else {
    res.status(500).json({ mensagem: 'Erro ao incluir livro' });
  }
});

router.delete('/:_id', async (req, res) => {
  const codigo = req.params._id;
  const count = await LivroDAO.excluir(codigo);
  if (count > 0) {
    res.json({ mensagem: 'Livro excluído com sucesso' });
  } else {
    res.status(404).json({ mensagem: 'Livro não encontrado' });
  }
});

module.exports = router;
