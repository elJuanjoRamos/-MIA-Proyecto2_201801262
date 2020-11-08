import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class ComentarioService {
    URI = 'http://192.168.0.115';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

   
    getComentarios(id: any) {
        return this.http.get<any>(`${this.URI}/comentarios/${id}`).pipe(map(data => {
                console.log(data)
                return data;
            }));
    }
    
    post(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/comentarios/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    postDenuncia(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/denuncias/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    getDenuncia(){
        return this.http.get<any>(`${this.URI}/denuncias`).pipe(map(data => {
            console.log(data)
            return data;
        }));
    }
    putDenuncia(id:any){

        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('id')});
        return this.http.put(`${this.URI}/denuncias/${id}`, {}, { headers }).pipe(map(data => {
            return data;
        }));
    }
}