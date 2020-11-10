import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class ChatService {
    URI = 'http://192.168.0.115:3000';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }

    
    
    get(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/chat/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    post(any:any) {   
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/ichat/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
}