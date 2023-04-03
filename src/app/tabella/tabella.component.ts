import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee, RootObject,Page,Links,Embedded} from 'src/Employee';
import { DataRestService } from '../services/data-rest.service';
import { FormBuilder } from '@angular/forms';

/*
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  templateUrl: 'tabella.component.html',
})
export class TabellaComponent {
  dati: RootObject | undefined;
  links:any;
  constructor(private data: DataRestService,
              private formBuilder: FormBuilder,) {
    this.loadData("http://localhost:8080/employees");
  }

  loadData(url:string) {
    this.data.getDataRows(url).subscribe(dati => {
      this.dati = dati;
      this.links = dati._links;
    });

  }

  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName','gender','hireDate','action'];
  
  insertForm = this.formBuilder.group({
    nascita: '',
    nome: '',
    sesso: '',
    data: '',
    cognome: ''
  });
  esito: any | undefined;
  onSubmit(input:any) {
    let json = JSON.parse(JSON.stringify('{"birthDate":"'+input.nascita+'","firstName": "'+input.nome+'","gender": "'+input.sesso+'","hireDate": "'+input.data+'","id": 0,"lastName": "'+input.cognome+'"}'));
    console.log(json);
    this.data.postDataRows("http://localhost:8080/employees",json).subscribe(esito => {
      this.esito = esito;
    })
 }

  deleteRow(i:number){
    console.log(i);
  }
  stampa(){
    console.log(this.dati);
  }

  nextPage(){
    if(this.dati) this.loadData(this.links.next.href);
  }

  prevPage(){
    if(this.dati) this.loadData(this.links.prev.href);
  }

  firstPage(){
    if(this.dati) this.loadData(this.links.first.href);
  }

  lastPage(){
    if(this.dati) this.loadData(this.links.last.href);
  }

}
