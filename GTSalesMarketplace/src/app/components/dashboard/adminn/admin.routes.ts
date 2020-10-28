
import { Routes } from '@angular/router';

//import { AdminnComponent } from './adminn.component';
import { HomeComponent } from './home/home.component';
import { AcategoryComponent } from './acategory/acategory.component';
import { AdenunciaComponent } from './adenuncia/adenuncia.component'
 
export const admin_routes: Routes = [
    //{ path: 'admin', component: AdminnComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category', component: AcategoryComponent },
    { path: 'denuncia', component: AdenunciaComponent },
//    { path: 'admin/detallecurso', component: DetalleCursoComponent },
//    { path: 'admin/detallecurso/:id', component: DetalleCursoFormComponent },
//    { path: 'admin/asignacionauxiliar', component: AsignacionAuxiliar },
//   { path: 'admin/asignacionauxiliar/:id', component: AsignacionForm },
//    { path: 'admin/desasignacion', component: DesasignacionComponent },
//    { path: 'admin/ticket', component: TicketAdmComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'admin'}
  ];