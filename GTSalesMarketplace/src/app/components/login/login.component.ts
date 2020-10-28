import { Component, OnInit } from '@angular/core';

//SERVICES 

import { AuthenticationService } from '../../services/auth.service';
import { use } from '../../sql/[MIA]API/routes/person.route';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private service:AuthenticationService) { }

  //variables
  mensaje: boolean = false;
  ngOnInit(): void {
  }


  login(usr:string, pass:string){
    var user = {
      username: usr,
      password: pass
    }
    this.mensaje =  this.service.login(user)
  }
}
