import { Component, OnInit } from '@angular/core';
import { LoggService } from '../../../../services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  arrayBitacora:any = []
  searchText;
  constructor(private service: LoggService) {
    this.inicializar()
   }

  ngOnInit(): void {
  }

  inicializar(){
    this.service.getLogg().subscribe(data => {
      this.arrayBitacora = data
    })
  }
  onChange(value:any) {
    if (value == 'NOR') {
      this.inicializar()
    } else{
      this.service.getOrden(value).subscribe(data=>{
        this.arrayBitacora = data;
      });
    }
  }

}
