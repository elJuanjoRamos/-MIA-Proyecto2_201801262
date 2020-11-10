import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-recpassword',
  templateUrl: './recpassword.component.html',
  styleUrls: ['./recpassword.component.css']
})
export class RecpasswordComponent implements OnInit {
  enviado:boolean = false;
  person:any
  constructor(private service: PersonService, private router:Router) { }

  ngOnInit(): void {
  }

  enviar(correo: string){
    if (correo != "") {
      this.service.getPersonByMail(correo).subscribe(data => {
        this.person = data

        var mail = {
          "nombre" : this.person.name,
          "mail": correo,
          "mensaje" : "Recuperar Password",
          "mensaje2" : "<br>Se ha solicitado recuperacion de password, si no fue usted la persona que solicito ignore este mensaje"+ " <br> Si lo fue, ingrese a esta ruta para recuperar su cueenta <strong> http://localhost:4200/recovery/password/" + this.person.id +" </strong>"      
        } 
         
        this.service.sendMessage(mail).subscribe(data => {
          this.router.navigate(['/login'])
        })


      })      
    }
  }

}
