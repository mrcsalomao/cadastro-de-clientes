import { Injectable } from '@angular/core';
import {Cliente} from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(newcliente: Cliente){
    const storage = this.obterStorage();
    storage.forEach((cliente: Cliente)=> {
      if(cliente.id === newcliente.id){
        Object.assign(cliente, newcliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  pesquisarClientes(nome: string) : Cliente[]{
    const clientes = this.obterStorage();
    if(!nome){
      return clientes;
    }
    return clientes.filter(cliente => cliente.nome?.indexOf(nome) !== -1);
  }

  pesquisarClientPorId(id: string) : Cliente | undefined {
    const clientes = this.obterStorage();
    return  clientes.find(cliente => cliente.id === id);
  }

  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repositorioClientes) {
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  delete(delcliente: Cliente) : void {
    const clientes = this.obterStorage();
    const dados = clientes.filter(cliente => cliente.id !== delcliente.id);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(dados));
  }


}
