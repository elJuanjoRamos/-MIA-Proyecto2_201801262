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

  ngOnInit(): void {
  }


  login(usr:string, pass:string){
    var user = {
      username: usr,
      password: pass
    }
    this.service.login(user)
  }
}
