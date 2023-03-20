const mongoose = require('mongoose');

// Definindo as opções da conexão
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Conectando ao banco de dados
mongoose.connect('mongodb://127.0.0.1:27017/livraria', options)
  .then(() => console.log('Conexão estabelecida com sucesso!'))
  .catch((err) => console.error('Erro ao conectar com o banco de dados:', err));

module.exports = mongoose;