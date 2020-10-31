import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from '../../../../services/factura.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  arrayFacturas = []
  constructor(private service: FacturaService, private router:Router) { 
    this.inicializar()
  }

  ngOnInit(): void {
  }

  inicializar(){
    this.service.getAll(localStorage.getItem('id')).subscribe(data => {
      this.arrayFacturas = data
    })
  }

  getFactura(id:any) {
    this.router.navigate(['/dashboard/client/invoice/', id])
  }

}
