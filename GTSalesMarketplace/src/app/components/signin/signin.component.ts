import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  constructor(private service: PersonService, private router: Router) { }

  ngOnInit(): void {
  }


  entrar(n:string, l: string, p:string, d: string, m: string,
      pa:string, pho:any){

        var person = {
          "name" :n,
          "lastname": l,
          "pais": p,
          "cdate": d,
          "pass": pa,
          "mail":m,
          "photo":"default.png",
          "credit": 10000,
          "idtipe": 2
        }

        this.service.post(person).subscribe(res=> {
          let result = JSON.parse(JSON.stringify(res))
          var mail = {
            "nombre" : n + " " + l,
            "mail": m,
            "mensaje" : "correo de confirmacion",
            "idusuario" : result.id
          } 
           
          this.service.sendMessage(mail).subscribe(data => {
            this.router.navigate(['/login']);
          })

          
        });
  }
}
