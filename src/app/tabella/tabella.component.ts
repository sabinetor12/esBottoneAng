import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee, RootObject,Page,Links,Embedded} from 'src/Employee';
import { DataRestService } from '../services/data-rest.service';


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
  constructor(private data: DataRestService) {
    this.loadData("http://localhost:8080/employees");
  }

  loadData(url:string) {
    this.data.getDataRows(url).subscribe(dati => {
      this.dati = dati;
      this.links = dati._links;
    });

  }

  displayedColumns: string[] = ['id', 'birthDate', 'firstName', 'lastName','gender','hireDate','action'];
  
  //dataSource = new MatTableDataSource<Employee>(this.ELEMENT_DATA);
  
  deleteRow(i:number){
    
    console.log(i);
  }
  stampa(){
    console.log(this.dati);
  }

  piu1(){
    this.loadData(this.links.next.href);
  }
}
