import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ComentarioService } from '../../../../services/comentario.service';


@Component({
  selector: 'app-denuncia',
  templateUrl: './denuncia.component.html',
  styleUrls: ['./denuncia.component.css']
})
export class DenunciaComponent implements OnInit {

  comment:number = 0;
  uri:any;
  producto:any;
  reservadas:any;
  comentarios:any = [];
  productForm: any;
  submitted = false;

  constructor(private service: ProductService, private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, private router: Router, private comentService: ComentarioService) { 


      this.activatedRoute.params.subscribe(params => {
        this.uri = params["id"];               
      });

      this.inicializar()
      
      

    }
    

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      mail: ['', Validators.required],
      mensaje: ['', Validators.required]
  });
  }

  inicializar(){
    this.service.getProduct(this.uri).subscribe(c => {
      this.producto = c;
    });
    this.service.getReservada(this.uri).subscribe(d => {
      if (d.length > 0) {
        this.reservadas = d                
      }
    });
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true
    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    var today = new Date();
    var data = {
      "idperson"   : localStorage.getItem('id'),
      "idproduct"  : this.uri,
      "descripcion" : this.productForm.value.mensaje,
      "fecha"      : today,
      "mail"      : localStorage.getItem('mail')
    }
    this.comentService.postDenuncia(data).subscribe(d => {
      this.router.navigate(['dashboard/client/products'])
    })
  }


}
