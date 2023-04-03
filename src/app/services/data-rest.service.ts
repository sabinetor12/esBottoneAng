import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, Page, RootObject } from 'src/Employee';

@Injectable({
  providedIn: 'root'
})
export class DataRestService {

  constructor(private http: HttpClient) { }

  getDataRows(apiUrl: string, pageSize?: number, pageNumber?: number): Observable<RootObject> {
    const params = new HttpParams()
      .set('page', pageNumber || 0)
      .set('size', pageSize || 20)
    return this.http.get<RootObject>(apiUrl);
  }
  deleteDataRows(apiUrl: string): Observable<RootObject> {
    return this.http.delete<RootObject>(apiUrl);
  }

  postDataRows(apiUrl: string,body:any): Observable<RootObject> {
    let httpHeaders= new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
    }); 
    let options = {
      headers: httpHeaders
    }; 
    return this.http.post<RootObject>(apiUrl,body,options);
  }
  /*updateDataRows(apiUrl:string):Observable<Employee[]>{
    return this.http.put<Employee[]>(apiUrl);
  }*/

}
