import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-myproducts-form',
  templateUrl: './myproducts-form.component.html',
  styleUrls: ['./myproducts-form.component.css']
})
export class MyproductsFormComponent implements OnInit {

  uri: any;
  producto: any;
  productForm: FormGroup;
  arrayCategorias :any;
  file:any = null;
  localUrl: any;
  visible:boolean = false
  reservadas:any;
  constructor(private service: ProductService, private formBuilder: FormBuilder, private sanitizer:DomSanitizer,
    private activatedRoute: ActivatedRoute, private router: Router, private category:CategoryService) {
    
      this.inicializarCategoria();  
      this.activatedRoute.params.subscribe(params => {
      this.uri = params["id"];
      if (this.uri === 'gestion') {
      } else {
        this.service.getProduct(this.uri).subscribe(c => {
            this.producto = c;
            this.productForm = new FormGroup({
              'id': new FormControl(this.producto.id),
              'name': new FormControl(this.producto.name),
              'detail': new FormControl(this.producto.detail),
              'price': new FormControl(this.producto.price),
              'tags': new FormControl(''),
              'photo': new FormControl(''),
              'idcategory': new FormControl(this.producto.idcategory),
              'idperson': new FormControl(this.producto.idperson)
            });
            this.service.getReservada(this.uri).subscribe(d => {
              if (d.length > 0) {
                this.visible = true
                this.reservadas = d                
              }
            })
          });
          
        }
      });
      
     
   }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      detail: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', Validators.required],
      tags: ['', Validators.required],
      idcategory: ['', Validators.required],
      idperson: ['', Validators.required],
    });
    //this.inicializar();
  }

  get f() { return this.productForm.controls; }

  inicializar( ) {
    /*this.service.getProduct(this.uri).subscribe(data => {
        this.producto = data;
    });*/
}

  inicializarCategoria( ) {
    this.category.getAll().subscribe(data => {
        this.arrayCategorias = data;
    });
  }
  
  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;

      var reader = new FileReader ();
      reader.readAsDataURL(file)
       reader.onload = (_event) => {
       this.localUrl = reader.result;
      }
    }    
  }

  onSubmit(palabras:string) {
    var p = [];
    if (palabras != "") {
      p = palabras.split(',');  
    }
    
    if (this.file == null) {
      return;
    }
    const formData = new FormData();
    formData.append('file', this.file);

    
    this.service.postImage(formData).subscribe(
      (res) => {
        
        var prod = {
          "name" : this.productForm.value.name,
          "detail" : this.productForm.value.detail,
          "price" : this.productForm.value.price,
          "idcategory" : this.productForm.value.idcategory,
          "idperson": localStorage.getItem('id'),
          "photo": res.filename,
          "reserv": p
        }
        if (this.uri == 'gestion') {
          this.service.post(prod).subscribe(data => {
            this.router.navigate(['/dashboard/client/myproducts']);
          })
        } else {
          this.service.put(prod, this.uri).subscribe(data =>{
            this.router.navigate(['/dashboard/client/myproducts']);
          });
        }
        
      },
      (err) => console.log(err)
    );


























                // stop here if form is invalid
    /*if (this.productForm.invalid) {
        console.log("nel perro")
        return;
    }*/
    /*if (this.uri === 'gestion') {
      
      
      var prod = {
        "name" : this.productForm.value.name,
        "detail" : this.productForm.value.detail,
        "price" : this.productForm.value.price,
        "idcategory" : this.productForm.value.idcategory,
        "idperson": localStorage.getItem('id'),
        "file": this.file
      }
      const formData = new FormData()
      console.log(this.file)
      formData.append('x', this.file);

      this.service.post(prod, formData)
        .subscribe(res => {
          this.inicializar();
         
        });
      } else {*/
          /*var curso: any = this.productForm.value;
          var data = {
              nombre: curso.nombre,
              codigo: this.cursoOriginal.codigo,
              estado: curso.estado
          };
          this.service.put(data, this.uri)
          .subscribe(res => {
          this.inicializar();
        });*/
      //}
      //this.productForm.reset();
  }
}
