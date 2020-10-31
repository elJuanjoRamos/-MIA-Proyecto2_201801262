import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';




@Injectable( /*{ providedIn: 'root' }*/)
export class AuthenticationService {

    URI = 'http://localhost:3000/';
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


    login(usuario: any): boolean {
        let uriUsuario: string = 'http://localhost:3000/auth/';
        let head = new HttpHeaders();
        head.append('Content-Type', 'application/json');

        var data = {
            username: usuario.username,
            password: usuario.password
        };
        this.http.post(uriUsuario, data, { headers: head })
            .subscribe(user => {

                let res = {
                    'results': JSON.stringify(user[0]),
                    'json': () => { return user[0]; }
                };
                let estado = JSON.parse(JSON.stringify(res.json())).estado

                if (estado) {
                    let token = JSON.parse(JSON.stringify(res.json())).token;
                    let rol = JSON.parse(JSON.stringify(res.json())).idtipe;
                    let iduser = JSON.parse(JSON.stringify(res.json())).id;
                    console.log(res.json())
                    //if (token) {
                    localStorage.setItem('id', JSON.parse(JSON.stringify(res.json())).id);
                    localStorage.setItem('mail', JSON.parse(JSON.stringify(res.json())).mail);
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(res.json()))

                    if (rol === 1) {
                        this.router.navigate(['/dashboard/admin/home']);
                    } else if (rol === 2) {
                        this.router.navigate(['/dashboard/client/homeclient/', iduser]);
                    }
                    return false
                } else { 
                    return true
                }

                
            }, error => {
                console.log(error.text());
            });


            return true

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
    }
}