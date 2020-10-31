import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  gohome(){
    this.router.navigate(['/dashboard/client/homeclient/', localStorage.getItem('id')])
  }
  salir(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
