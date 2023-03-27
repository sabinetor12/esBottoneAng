import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, Page, RootObject } from 'src/Employee';

@Injectable({
  providedIn: 'root'
})
export class DataRestService {

  constructor(private http: HttpClient) {}
  
  getDataRows(apiUrl:string):Observable<RootObject>{
    return this.http.get<RootObject>(apiUrl);
  }
  deleteDataRows(apiUrl:string):Observable<RootObject>{
    return this.http.delete<RootObject>(apiUrl);
  }
  /*updateDataRows(apiUrl:string):Observable<Employee[]>{
    return this.http.put<Employee[]>(apiUrl);
  }*/
  
}
