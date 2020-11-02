import { Component, OnInit } from '@angular/core';
import { LoggService } from '../../../../services/log.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  reporte1:any=[]
  reporte2:any=[]
  reporte3:any=[]
  reporte4:any=[]
  reporte5:any=[]
  reporte6:any=[]
  constructor(private service:LoggService) { 
    this.service.reporte1().subscribe(data => {
      this.reporte1 = data
    })
    this.service.reporte2().subscribe(data => {
      this.reporte2 = data
    })
    this.service.reporte3().subscribe(data => {
      this.reporte3 = data
    })
 
    this.service.reporte4().subscribe(data => {
      this.reporte4 = data
    })
    this.service.reporte5().subscribe(data => {
      console.log(data)
      this.reporte5 = data
    })
    this.service.reporte6().subscribe(data => {
      console.log(data)
      this.reporte6 = data
    })
 
  }

  ngOnInit(): void {
  }

}
