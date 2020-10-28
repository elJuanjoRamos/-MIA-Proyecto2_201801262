import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class ProductService {
    URI = 'http://localhost:3000';
    
    constructor(private http: HttpClient) { }

    getAll(id: any) {
        return this.http.get<any[]>(`${this.URI}/product/${id}`).pipe(map(data => {
            return data;
            }));
    }
    getAll2(id: any) {
        return this.http.get<any[]>(`${this.URI}/getall/${id}`).pipe(map(data => {
            return data;
            }));
    }
    getProduct(id: any) {
        return this.http.get<any>(`${this.URI}/gproduct/${id}`).pipe(map(data => {
                console.log(data)
                return data;
            }));
    }
    getReservada(id: any) {
        return this.http.get<any>(`${this.URI}/reservada/${id}`).pipe(map(data => {
            return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/dproduct/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }

    postImage(image:any){

        return this.http.post<any>('http://localhost:3000/file',image).pipe(map(data => {
            return data;
        }));
    }
    post(information:any) {
        
        let data = JSON.stringify(information);

        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
    
        return this.http.post(`${this.URI}/product/`, data, { headers, responseType: 'blob' as 'json' }).pipe(map(data => {
            return data;
        }));
    }
    put(any:any, id:any) {
        let data = JSON.stringify(any);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/uproduct/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    blockProduct(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/bproduct/${id}`, {}, { headers }).pipe(map(data => {
            return data;
        }));
    }
}