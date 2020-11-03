
import { Routes } from '@angular/router';

import { ChomeComponent } from './chome/chome.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { MyproductsFormComponent } from './myproducts-form/myproducts-form.component'
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DenunciaComponent } from './denuncia/denuncia.component';
import { CarritoComponent } from './carrito/carrito.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { ChatComponent } from './chat/chat.component';

export const client_routes: Routes = [
    { path: 'homeclient/:id', component: ChomeComponent },
    { path: 'myproducts', component: MyproductsComponent },
    { path: 'myproducts/:id', component: MyproductsFormComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'denuncia/:id', component: DenunciaComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'invoice/:id', component:  InvoiceDetailComponent},
    { path: 'invoice', component:  InvoiceComponent},
    { path: 'chat', component:  ChatComponent},
    
//    { path: 'admin/asignacionauxiliar', component: AsignacionAuxiliar },
//   { path: 'admin/asignacionauxiliar/:id', component: AsignacionForm },
//    { path: 'admin/desasignacion', component: DesasignacionComponent },
//    { path: 'admin/ticket', component: TicketAdmComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'client'}
  ];