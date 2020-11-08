import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable( /*{ providedIn: 'root' }*/)
export class LikeService {
    URI = 'http://192.168.0.115';
    //URI = 'http://localhost:3000';
    headers = new HttpHeaders({'Content-Type': 'application/json','Authorization': localStorage.getItem('token')});

    constructor(private http: HttpClient) { }


    getlike(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/glike/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    getdislike(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/gdlike/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    postlike(any:any) {
        console.log(any)
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/like/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
    postdislike(any:any) {
        
        let data = JSON.stringify(any);        
        var headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')});
        return this.http.post(`${this.URI}/dislike/`, data, { headers }).pipe(map(data => {
            return data;
        }));
    }
   
    
}