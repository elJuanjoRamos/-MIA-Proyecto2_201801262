import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class LoggService {
    URI = 'http://192.168.0.115:3000';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }


    getLogg() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/bitacora`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte1() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte1`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte2() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte2`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte3() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte3`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte4() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte4`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte5() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte5`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    reporte6() {
        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.get(`${this.URI}/reporte6`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    getOrden(id: any) {
        return this.http.get<any>(`${this.URI}/bitacora/${id}`).pipe(map(data => {
                return data;
            }));
    }


}