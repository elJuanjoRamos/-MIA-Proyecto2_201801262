import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { ComentarioService } from '../../../../services/comentario.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  comment:number = 0;
  uri:any;
  producto:any;
  reservadas:any;
  comentarios:any = [];
  productForm: any;
  submitted = false;

  constructor(private service: ProductService, private formBuilder: FormBuilder, private sanitizer:DomSanitizer,
    private activatedRoute: ActivatedRoute, private router: Router, private comentarioService: ComentarioService) { 


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
    this.comentarioService.getComentarios(this.uri).subscribe(data => 
      this.comentarios = data
    );
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
      "comentario" : this.productForm.value.mensaje,
      "fecha"      : today
    }
    this.comentarioService.post(data).subscribe(res => {
        setTimeout(() => {
          this.inicializar();
        }, 2000); 
    });
  }


  denuncia(id:any){
    this.router.navigate(['dashboard/client/denuncia/', id])
  }

}
