import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Menu } from "../../componentes/Menu";
import { Livro } from '../../classes/modelo/Livro'
import { ControleLivros } from '../../classes/controle/ControleLivros'
import { ControleEditora } from "../../classes/controle/ControleEditora";

const controleLivros = new ControleLivros();

const LivroDados = () => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [autores, setAutores] = useState("");
  const [codEditora, setCodEditora] = useState<number>(0);
  const opcoes = ControleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const navigate = useRouter().push;

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluirLivro = async (livro: Livro) => {
    await controleLivros.incluir(livro);
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: "",
      titulo,
      resumo,
      autores: autores.split("\n"),
      codEditora,
    };
    await incluirLivro(livro).then(() => {
      navigate("/LivroLista");
    });
  };

  return (
    <div className="col-md-100 mx-auto">
      <Menu />
      <div className="col-md-3 mx-auto">
        <div className="media">
          <main>
            <h1>Cadastro de Livros</h1>
            <form onSubmit={incluir}>
              <div>
                <label htmlFor="titulo">Título:</label>
                <input
                  className="form-control"
                  type="text"
                  id="titulo"
                  value={titulo}
                  onChange={(evento) => setTitulo(evento.target.value)}
                />
              </div>
              <div>
                <label htmlFor="resumo">Resumo:</label>
                <textarea
                  className="form-control" 
                  aria-label="With textarea"
                  id="resumo"
                  value={resumo}
                  onChange={(evento) => setResumo(evento.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="autores">Autores:</label>
                <textarea
                  className="form-control form-control-sm" 
                  aria-label="With textarea"
                  id="autores"
                  value={autores}
                  onChange={(evento) => setAutores(evento.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="editora">Editora:</label>
                <select id="inputState" className="form-select" value={codEditora} onChange={tratarCombo}>
                  {opcoes.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.text}
                    </option>
                  ))}
                </select>
              </div>
              <p></p>
              <button type="submit" className="btn btn-primary">Incluir</button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LivroDados;
