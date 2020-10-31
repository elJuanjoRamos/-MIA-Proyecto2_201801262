import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-acategory',
  templateUrl: './acategory.component.html'
})
export class AcategoryComponent implements OnInit {

  arrayCategorias = [];
  catForm:FormGroup;
  uri:any;
  category:any;
  validar: boolean = false;
  submitted = false;

  constructor(private service: CategoryService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.uri = params["id"]
      console.log(this.uri)
      if (this.uri != 'gestion') {
        this.service.getCategory(this.uri).subscribe(data =>{
          this.category = data;

          this.catForm = new FormGroup({
            'id': new FormControl(this.category.id, Validators.required),
            'name': new FormControl(this.category.name, Validators.required)
          });
        });
      } else {
        this.inicializar();
      }
    });  
    this.inicializar();
   }

  ngOnInit(): void {
    this.catForm = this.formBuilder.group({
      id:       [''],
      name:     ['', Validators.required]
  });
  }


  inicializar( ) {
    this.service.getAll().subscribe(data => {
        this.arrayCategorias = data;
    });
  }

  get f() { return this.catForm.controls; }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.catForm.invalid) {
      return;
    }
    console.log(this.uri)
    if (this.uri == 'gestion') {
      var category = {
        "name": this.catForm.value.name
      }
      this.service.post(category).subscribe(res=> {
        this.inicializar();
      });
    } else {
      this.service.put(this.catForm.value, this.uri).subscribe(data =>{
        this.router.navigate(['/dashboard/admin/category/', 'gestion']);
      })
    }
    this.catForm.reset()
  }


  delete(id:any){
    this.service.delete(id).subscribe(res =>{
       this.inicializar();
    });
  }
  update(id: any){
    this.router.navigate(['/dashboard/admin/category/', id]);
  }
}
