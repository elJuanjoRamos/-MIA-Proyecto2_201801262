import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class CarritoService {
    URI = 'http://192.168.0.115:3000';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getCarrito(id: any) {
        console.log(id)
        return this.http.get<any>(`${this.URI}/carrito/${id}`).pipe(map(data => {
            console.log(data)
                return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/carrito/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    clean(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/cleancarrito/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/carrito/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
}