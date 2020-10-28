import { Component, OnInit } from '@angular/core';
import { ComentarioService } from '../../../../services/comentario.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-adenuncia',
  templateUrl: './adenuncia.component.html',
  styleUrls: ['./adenuncia.component.css']
})
export class AdenunciaComponent implements OnInit {
  
  denuncias:any = []
  denunciatemporal:any
  constructor(private service:ComentarioService, private productservice: ProductService) { 
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

  bloquear(id:any, idproduct:any){
    this.service.putDenuncia(id).subscribe(data =>{
        var res:any = data;
        if (res.state) {
          this.productservice.blockProduct(idproduct).subscribe(dat=>{
            this.inicializar()
          })  
        }
    })
  }

}
