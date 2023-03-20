import { Injectable } from '@angular/core';
import { Livro } from './livro';

const baseURL = 'http://localhost:3030/livros';

interface LivroMongo {
  codigo: string;
  codEditora: number;
  titulo: string;
  resumo: string;
  autores: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {

  constructor() { }

  async obterLivros(): Promise<Livro[]> {
    const response = await fetch(baseURL);
    const livrosMongo: LivroMongo[] = await response.json();
    const livros: Livro[] = livrosMongo.map(livroMongo => {
      return {
        codigo: livroMongo.codigo,
        codEditora: livroMongo.codEditora,
        titulo: livroMongo.titulo,
        resumo: livroMongo.resumo,
        autores: livroMongo.autores
      }
    });
    return livros;
  }

  async incluir(livro: Livro): Promise<boolean> {
    const livroMongo: LivroMongo = {
      codigo: livro.codigo,
      codEditora: livro.codEditora,
      titulo: livro.titulo,
      resumo: livro.resumo,
      autores: livro.autores
    };
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(livroMongo)
    });
    const data = await response.json();
    return data.ok;
  }

  async excluir(codigo: string): Promise<boolean> {
    const url = `${baseURL}/${codigo}`;
    const response = await fetch(url, { method: 'DELETE' });
    const data = await response.json();
    return data.ok;
  }
}
