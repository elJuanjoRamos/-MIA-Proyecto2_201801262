import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../../../services/comentario.service';
import { ProductService } from '../../../../services/product.service';
import { PersonService } from '../../../../services/person.service'

@Component({
  selector: 'app-adenuncia',
  templateUrl: './adenuncia.component.html',
  styleUrls: ['./adenuncia.component.css']
})
export class AdenunciaComponent implements OnInit {
  
  denuncias:any = []
  denunciatemporal:any
  constructor(private service:ComentarioService, private personService: PersonService,  private productservice: ProductService) { 
    this.inicializar()
  }

  ngOnInit(): void {
    
  }

  inicializar(){
    this.service.getDenuncia().subscribe(data => {
      this.denuncias = data
    });
  }

  insertar(info:any){
      this.denunciatemporal = info
  }

  rechazardenuncia(id){
    this.service.putDenuncia(id).subscribe(data =>{
        this.inicializar()
    })
  }

  aceptardenuncia(denuncia){
    this.service.putDenuncia(denuncia.id).subscribe(data =>{

      this.productservice.blockProduct(denuncia.idprod).subscribe(dat => {
        
        var mail = {
          "nombre" : denuncia.namemalo,
          "mail": denuncia.mail,
          "mensaje" : "Producto bloqueado ID:" + denuncia.idprod,
          "mensaje2" : "<br>Una o mas quejas llegaron respecto al siguiente producto"+ " <br> <strong>Producto: </strong>" + denuncia.producto +" <br> <strong>Precio: </strong>" + denuncia.price +" <br> <strong>Categoria: </strong>" + denuncia.category +" <br> <strong>Detalle: </strong>" + denuncia.detalle + "<br> Por lo que administracion decidio eliminar su publicacion"     
        } 
         
        this.personService.sendMessage(mail).subscribe(data => {
          this.inicializar()
        })
      })
    })
  }
}
