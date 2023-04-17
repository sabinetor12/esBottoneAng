import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee, RootObject,Page,Links,Embedded} from 'Employee';
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

  loadData(url:string,pageNumber?:number) {
    this.data.getDataRows(url,undefined,pageNumber).subscribe(dati => {
      this.dati = dati;
      this.links = dati._links;
    });

  }

  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName','gender','hireDate','delete'];
  
  insertForm = this.formBuilder.group({
    id:'',
    nascita: '',
    nome: '',
    sesso: '',
    data: '',
    cognome: ''
  });
  esito: any | undefined;

  onSubmit(input:any,page?:number) {

    let nPag = this.dati?.page.number;
    console.log(nPag,"/n",this.links.prev.href)
    if(input.id==""){ //inserimento
    let json = '{"birthDate":"'+input.nascita+'","firstName": "'+input.nome+'","gender": "'+input.sesso+'","hireDate": "'+input.data+'","id": 0,"lastName": "'+input.cognome+'"}';
    console.log(json);
    this.data.postDataRows("http://localhost:8080/employees",json).subscribe(esito => {
      this.esito = esito;
      this.loadData("http://localhost:8080/employees?page="+nPag+"&size=20")
    })} else{ //modifica
      let json = '{"birthDate":"'+input.nascita+'","firstName": "'+input.nome+'","gender": "'+input.sesso+'","hireDate": "'+input.data+'","id": '+input.id+',"lastName": "'+input.cognome+'"}';
      this.data.putDataRows("http://localhost:8080/employees/"+input.id,json).subscribe(esito => {
        this.esito = esito;
        this.loadData("http://localhost:8080/employees?page="+nPag+"&size=20")
      })
    }
    
  }

  deleteRow(i:number){
    let nPag = this.dati?.page.number;
    console.log("http://localhost:8080/employees/"+i.toString());
    this.data.deleteDataRows("http://localhost:8080/employees/"+i.toString()).subscribe(esito => {
      this.esito = esito;
      this.loadData("http://localhost:8080/employees?page="+nPag+"&size=20")
    })
    
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
