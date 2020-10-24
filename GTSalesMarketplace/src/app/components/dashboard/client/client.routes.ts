
import { Routes } from '@angular/router';

import { ChomeComponent } from './chome/chome.component';
import { MyproductsComponent } from './myproducts/myproducts.component';
import { MyproductsFormComponent } from './myproducts-form/myproducts-form.component'

export const client_routes: Routes = [
    { path: 'homeclient/:id', component: ChomeComponent },
    { path: 'myproducts', component: MyproductsComponent },
    { path: 'myproducts/:id', component: MyproductsFormComponent },
//    { path: 'admin/detallecurso', component: DetalleCursoComponent },
//    { path: 'admin/detallecurso/:id', component: DetalleCursoFormComponent },
//    { path: 'admin/asignacionauxiliar', component: AsignacionAuxiliar },
//   { path: 'admin/asignacionauxiliar/:id', component: AsignacionForm },
//    { path: 'admin/desasignacion', component: DesasignacionComponent },
//    { path: 'admin/ticket', component: TicketAdmComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'client'}
  ];