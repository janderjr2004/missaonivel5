import { Livro } from "../modelo/Livro";

interface LivroMongo {
  codigo: string,
  codEditora: number,
  titulo: string,
  resumo: string,
  autores: string[]
}

const baseUrl = 'http://localhost:3030/livros';

export class ControleLivros {
  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseUrl, { method: 'GET' });
    const livrosMongo: LivroMongo[] = await response.json();
    const livros: Livro[] = livrosMongo.map(livroMongo => new Livro(livroMongo.codigo, livroMongo.codEditora,livroMongo.titulo,livroMongo.resumo,livroMongo.autores));
    return livros;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      resumo: livro.resumo,
      titulo: livro.titulo,
      autores: livro.autores,
    };
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(livroMongo),
    });
    const resultado = await response.json();
    return resultado.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${baseUrl}/${codigo}`;
    const response = await fetch(url, {
      method: 'DELETE',
    });
    const resultado = await response.json();
    return resultado.ok;
  }
}

