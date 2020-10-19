
import { Routes } from '@angular/router';

//import { AdminnComponent } from './adminn.component';
import { ChomeComponent } from './chome/chome.component';


export const client_routes: Routes = [
    { path: 'homeclient/:id', component: ChomeComponent },
//    { path: 'admin/cursos/:id', component: CursoComponent },
//    { path: 'admin/detallecurso', component: DetalleCursoComponent },
//    { path: 'admin/detallecurso/:id', component: DetalleCursoFormComponent },
//    { path: 'admin/asignacionauxiliar', component: AsignacionAuxiliar },
//   { path: 'admin/asignacionauxiliar/:id', component: AsignacionForm },
//    { path: 'admin/desasignacion', component: DesasignacionComponent },
//    { path: 'admin/ticket', component: TicketAdmComponent },
    {path: '**', pathMatch: 'full', redirectTo: 'client'}
  ];