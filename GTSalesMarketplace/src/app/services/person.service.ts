import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class PersonService {
    URI = 'http://localhost:3000';
    
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${this.URI}/person`).pipe(map(data => {
            return data;
            }));
    }
    getPerson(id: any) {
        return this.http.get<any>(`${this.URI}/person/${id}`).pipe(map(data => {
                return data;
            }));
    }
    delete(id:any) {
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.delete(`${this.URI}/person/${id}`, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(any:any) {
        
        let data = JSON.stringify(any);

        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/iuser/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    put(any:any, id:any) {
        let data = JSON.stringify(any);
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.put(`${this.URI}/person/${id}`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    postImage(image:any){

        return this.http.post<any>('http://localhost:3000/file',image).pipe(map(data => {
            return data;
        }));
    }

    sendMessage(body) {
        return this.http.post(`${this.URI}/formulario`, body);
    }
}