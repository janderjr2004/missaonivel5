import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Livro } from '../../classes/modelo/Livro'
import { ControleLivros } from '../../classes/controle/ControleLivros'
import { LinhaLivro } from '../../componentes/LinhaLivro'
import { Menu } from '../../componentes/Menu';

const LivroLista = () => {
  const [livros, setLivros] = useState<Array<Livro>>([])
  const [carregado, setCarregado] = useState<boolean>(false)
  const controleLivros = new ControleLivros();

  useEffect(() => {
    controleLivros.obterLivros().then(dados => {
      setLivros(dados)
      setCarregado(true)
    }).catch(erro => console.log(erro))
  }, [])

  const excluirLivro = async (codigo: string) => {
    try {
      const resultado = await controleLivros.excluir(codigo)
      return resultado
    } catch (erro) {
      console.log(erro)
      return false
    }
  }

  const excluir = async (codigo: string) => {
    const resultado = await excluirLivro(codigo)
    if (resultado) {
      setCarregado(false)
    }
  }

  return (
    <div className="media"> 
      <Head>
        <title>Loja Next - Lista de Livros</title>
        <meta name="description" content="Lista de livros da Loja Next" />
        <link  rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />

      <main className="media">
        <h1 className="text-center">Lista de Livros</h1>
        <table className="table table-striped mx-auto">
          <thead className="table-dark">
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Autores</th>
              <th>Editora</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro, index) => (
              <LinhaLivro key={index} livro={livro} excluir={() => excluir(livro.codigo)} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default LivroLista
