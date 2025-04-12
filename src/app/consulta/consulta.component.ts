import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {Cliente} from '../cadastro/cliente';
import {ClienteService} from '../cliente.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-consulta',
  imports: [
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  pesquisa: String = "";
  displayedColumns: string[] = ['id','nome', 'email', 'cpf', 'dataNascimento', 'acoes'];
  listaClientes: Cliente[] = [];
  deletando : boolean = false;
  snack : MatSnackBar = inject(MatSnackBar);

  constructor(private service: ClienteService, private router: Router) {
  }

  ngOnInit() {
    this.listaClientes = this.service.pesquisarClientes('');
  }

  pesquisarPorNome(){
    this.listaClientes = this.service.pesquisarClientes(this.pesquisa.toString());
  }

  paraEditar(id: string){
    this.router.navigate(['/cadastro'], { queryParams: { id } });
  }

  paraExcluir(cliente: Cliente ){
    cliente.deletando = true;
  }

  excluir(cliente :Cliente){
    this.service.delete(cliente);
    this.listaClientes = this.service.pesquisarClientes('');
    this.deletando = false;
    this.snack.open('Dados excluído com sucesso!');
  }

}
