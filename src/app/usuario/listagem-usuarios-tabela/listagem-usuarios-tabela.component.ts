import { Component } from '@angular/core';
import { Usuario } from 'src/app/shared/modelo/usuario';
import { UsuarioService } from 'src/app/shared/services/usuario.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';

export interface mostrarColunas {
  nome: string;
  id: number;
  idade: number;
  cpf: string;
}

const ELEMENT_DATA: mostrarColunas[] = [
  {id: 1, nome: 'Hydrogen', idade: 1.0079, cpf: 'H'},
  {id: 2, nome: 'Helium', idade: 4.0026, cpf: 'He'},
  {id: 3, nome: 'Lithium', idade: 6.941, cpf: 'Li'},
  {id: 4, nome: 'Beryllium', idade: 9.0122, cpf: 'Be'},
  {id: 5, nome: 'Boron', idade: 10.811, cpf: 'B'},
  {id: 6, nome: 'Carbon', idade: 12.0107, cpf: 'C'},
  {id: 7, nome: 'Nitrogen', idade: 14.0067, cpf: 'N'},
  {id: 8, nome: 'Oxygen', idade: 15.9994, cpf: 'O'},
  {id: 9, nome: 'Fluorine', idade: 18.9984, cpf: 'F'},
  {id: 10, nome: 'Neon', idade: 20.1797, cpf: 'Ne'},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-listagem-usuarios-tabela',
  templateUrl: './listagem-usuarios-tabela.component.html',
  styleUrls: ['./listagem-usuarios-tabela.component.css'],
 
})
export class ListagemUsuariosTabelaComponent{
/*editar(id:number) {
  this.usuarioService.atualizar(id).subscribe(
    usuarioAtualizado => {
      const index = this.usuarios.data.findIndex(usuario =>
        usuario.id === id
      );
      if (index > -1) {
        this.usuarios.data[index] = usuarioAtualizado;
        this.usuarios = new MatTableDataSource(this.usuarios.data);

}})};*/
excluir(id: number) {
  this.usuarioService.apagar(id).subscribe(
    usuarioRemovido => {
      const indx = this.usuarios.data.findIndex(usuario =>
        usuario.id === id);
      if (indx > -1) {
        this.usuarios.data.splice(indx, 1);
        this.usuarios = new MatTableDataSource(this.usuarios.data);
        }
    }
  )};
filtrar(value: string) {
  this.usuarios.filter = value.trim().toLowerCase();
}
  displayedColumns: string[] = ['id', 'nome', 'idade', 'cpf', 'acoes'];
  usuarios!: MatTableDataSource<Usuario>;



    constructor(private usuarioService: UsuarioService) {
  }
  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios =>
        this.usuarios = new MatTableDataSource<Usuario>(usuarios)
    );
    console.log('estou aqui');
  }
}