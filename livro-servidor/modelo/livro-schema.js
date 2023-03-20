const banco = require('./conexao');

// Definindo a estrutura do schema
const LivroSchema = new banco.Schema({
  titulo: String,
  autor: String,
  ano: Number,
  genero: String,
});

// Associando o schema à coleção livros e criando o modelo Livro
const Livro = banco.model('livros', LivroSchema);

module.exports = Livro;
