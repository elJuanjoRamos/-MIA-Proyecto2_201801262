import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PersonService } from '../../../../services/person.service';
@Component({
  selector: 'app-chome',
  templateUrl: './chome.component.html'
})
export class ChomeComponent implements OnInit {
  userLogeado:any
  uri:any;
  usrForm: FormGroup;
  error = '';
  validar: boolean = false;
  submitted = false;


  /////
  nombrecompleto:any
  credito:any
  tipo:any;

  constructor(private service: PersonService,  private formBuilder: FormBuilder, 
    private activatedRoute: ActivatedRoute, private router: Router) {
        this.inicializar();
     }

  

  ngOnInit() {
    this.usrForm = this.formBuilder.group({
        id:       ['', Validators.required],
        name:     ['', Validators.required],
        lastname: ['', Validators.required],
        pais: ['', Validators.required],
        cdate: ['', Validators.required],
        mail: ['', Validators.required],
        pass: ['', Validators.required],
        credit: ['', Validators.required],
        idtipe: ['', Validators.required],
        activo: ['', Validators.required]
    });
    this.inicializar();
  }

  inicializar(){
    this.activatedRoute.params.subscribe(params => {
      this.uri = params["id"];
      this.service.getPerson(this.uri).subscribe(c => {
            this.userLogeado = c;

            ////
            this.nombrecompleto = this.userLogeado.name + " " + this.userLogeado.lastname
            this.credito = this.userLogeado.credit;
            this.tipo = this.userLogeado.id;

            //

            this.validar = true;
            this.usrForm = new FormGroup({
              'id': new FormControl(this.userLogeado.id, Validators.required),
              'name': new FormControl(this.userLogeado.name, Validators.required),
              'lastname': new FormControl(this.userLogeado.lastname, Validators.required),
              'pais': new FormControl(this.userLogeado.pais, Validators.required),
              'cdate': new FormControl(this.userLogeado.cdate, Validators.required),
              'pass': new FormControl(this.userLogeado.pass, Validators.required),
              'mail': new FormControl(this.userLogeado.mail, Validators.required),
              'credit': new FormControl(this.userLogeado.credit, Validators.required),
              'activo': new FormControl(this.userLogeado.activo, Validators.required),
              'idtipe': new FormControl(this.userLogeado.idtipe, Validators.required)
            });
          });
    });
  }


  get f() { return this.usrForm.controls; }




  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.usrForm.invalid) {
      return;
    }
    this.service.put(this.usrForm.value, this.uri).subscribe(res => {
        setTimeout(() => {
          this.router.navigate(['/dashboard/client/homeclient/', this.uri]);
        }, 2000); 
    });
  }


  delete(){
    this.service.delete(this.uri).subscribe(res =>{
      this.router.navigate(['/login']);
    });
  }

}
