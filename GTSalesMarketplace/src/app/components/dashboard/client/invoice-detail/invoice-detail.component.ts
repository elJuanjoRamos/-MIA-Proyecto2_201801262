import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../../../services/factura.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {
  uri:any
  factura:any;
  arrayFactura:any = []
  constructor(private activroute: ActivatedRoute, private service: FacturaService) {
    this.activroute.params.subscribe(params => {
      this.uri = params['id']

      this.service.getFactura(this.uri).subscribe(data => {
        console.log(data)
        this.arrayFactura = data;
        this.factura = this.arrayFactura[0]
      })
    })


   }

  ngOnInit(): void {
  }

}
