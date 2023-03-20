import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
selector: 'app-livro-lista',
templateUrl: './livro-lista.component.html',
styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

editoras: Array<Editora> = [];
livros: Array<Livro> = [];

constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }

ngOnInit(): void {
this.servLivros.obterLivros().then(livros => {
this.livros = livros;
});
this.editoras = this.servEditora.getEditoras();
}

excluir = (codigo: string) => {
this.servLivros.excluir(codigo).then(ok => {
this.servLivros.obterLivros().then(livros => {
this.livros = livros;
});
});
}

obterNome = (codEditora: number) => this.servEditora.getNomeEditora(codEditora);

}