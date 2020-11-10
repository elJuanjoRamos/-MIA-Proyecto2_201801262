import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class FacturaService {
    URI = 'http://192.168.0.115:3000';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll(id: any) {
        return this.http.get<any>(`${this.URI}/gfactura/${id}`).pipe(map(data => {
                return data;
            }));
    }
    getFactura(id: any) {
        return this.http.get<any>(`${this.URI}/factura/${id}`).pipe(map(data => {
                return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/factura/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/factura/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

    postdetalle(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/detalle/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }

}