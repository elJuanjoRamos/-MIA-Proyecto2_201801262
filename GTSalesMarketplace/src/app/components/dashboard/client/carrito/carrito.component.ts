import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../../services/carrito.service';
import { FacturaService } from '../../../../services/factura.service';
import { PersonService } from '../../../../services/person.service';
 
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  arrayCarrito:any = []
  visible = false;
  type = 'primary'
  message = '';
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private service:CarritoService, 
    private person:PersonService,
    private factura:FacturaService,
    private router: Router) { 
    this.inicializar()
  }

  ngOnInit(): void {
  }


  inicializar(){
    let uri = localStorage.getItem('id')
    this.service.getCarrito(uri).subscribe(data => {
      this.arrayCarrito = data
    })
  }

  delete(id:any){
    this.service.delete(id).subscribe(d => {
      this.inicializar()
    })
  }

  comprar(){
    let totalTemp = 0;
    for (let index = 0; index < this.arrayCarrito.length; index++) {
      const element = this.arrayCarrito[index];
      totalTemp = totalTemp + element.precio
    }




    

    //le acanza el dinero
    if (this.user.credit >= totalTemp) {
      //Se manda a descontar 
      var data = {
        "precio"  : totalTemp,
        "estado"  : 2
      }
      this.person.putCredit(data, localStorage.getItem('id')).subscribe( data => {
        console.log(data)
      }) 
      //HACE UPDATE DEL CREDITO A LOS VENDEDORES
      for (let index = 0; index < this.arrayCarrito.length; index++) {
        const element = this.arrayCarrito[index];
        data = {
          "precio"  : element.precio,
          "estado"  : 1
        } 
        this.person.putCredit(data, element.idvendedor).subscribe()
      }

      //SE ENVIA MAIL AL COMPRADOR


      var table = "<br> <table class=\"table\">  <thead class=\"thead-dark\">  <tr> <th>Producto</th> <th>Categoria</th> <th>Detalle</th>    <th>Precio</th>         </tr></thead><tbody><tr>"
      var body = ""
      for (let index = 0; index < this.arrayCarrito.length; index++) {
        const element = this.arrayCarrito[index];
        body = body + "<tr> <td>"+ element.producto +"</td> " +" <td>"+ element.categoria +"</td> " +" <td>"+ element.detalle +"</td> " +" <td>"+ element.precio +"</td> " + " </tr>"
      }
      body = body + "<tr><td></td><td></td><td>Total</td><td>"+ totalTemp +"</td></tr>"

      var endtable = "</tbody></table> <br> El total se desconto de su credito, puede ver la factura en la seccion de 'facturas' de la pagina web"

      var factura = {
        "nombre" : this.user.name + " " + this.user.lastname,
        "mail": this.user.mail,
        "mensaje" : "Factura Electronica",
        "mensaje2" : table + body + endtable     
      }

      this.person.sendMessage(factura).subscribe()

       //SE CREA LA FACTURA
       var datafactura = {
        "total": totalTemp,
        "cliente" : this.user.name + " " + this.user.lastname,
        "mailcliente" : this.user.mail,
        "idcliente" : this.user.id 
      }
      var idfactura;
      this.factura.post(datafactura).subscribe(data => {


        //SE INSERTA EL DETALLE DE FACTURA
        idfactura = JSON.parse(JSON.stringify(data)).id
        for (let index = 0; index < this.arrayCarrito.length; index++) {
          const element = this.arrayCarrito[index];
          data = {
            "idfactura"  : idfactura,
            "idcarrito"  : element.id
          } 
          this.factura.postdetalle(data).subscribe(data=> {
            console.log(data)
          })
        }
        
        

      //SE ENVIA MAIL A LOS VENDEDORES
        for (let index = 0; index < this.arrayCarrito.length; index++) {
        const element = this.arrayCarrito[index];
        console.log(element)
        var mail = {
          "nombre" : element.vendedor,
          "mail": element.mailvendedor,
          "mensaje" : "Venta Realizada",
          "mensaje2" : "<br>Se ha vendio su siguiente producto: "+ " <br> <strong>Producto: </strong>" + element.producto +" <br> <strong>Precio: </strong>" + element.precio +" <br> <strong>Categoria: </strong>" + element.categoria +" <br> <strong>Detalle: </strong>" + element.detalle + "<br> El credito se ha agregado a su cuenta"     
        }
        this.person.sendMessage(mail).subscribe()
      }


        //SE LIMPIA EL CARRITO
        this.service.clean(this.user.id).subscribe(data => {
          this.router.navigate(['dashboard/client/invoice/', idfactura])
        })     

      })

       







     
      
      //no le alcanza el dinero
    } else {
      this.visible = true;
      setTimeout(()=> {
         this.visible = false;
      }, 2000)
    }
  }
}
