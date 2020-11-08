import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class CategoryService {
    URI = 'http://192.168.0.115';
    //URI = 'http://localhost:3000';
        headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/getCategory`).pipe(map(data => {
            return data;
            }));
    }
    getCategory(id: any) {
        return this.http.get<any>(`${this.URI}/getCategory/${id}`).pipe(map(data => {
                return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/dcategory/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/icategory/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(any:any, id:any) {
        let data = JSON.stringify(any);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/ucategory/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
}