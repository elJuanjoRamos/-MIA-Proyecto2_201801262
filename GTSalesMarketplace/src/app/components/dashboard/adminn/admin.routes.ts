
import { Routes } from '@angular/router';

//import { AdminnComponent } from './adminn.component';
import { HomeComponent } from './home/home.component';
import { AcategoryComponent } from './acategory/acategory.component';
import { AdenunciaComponent } from './adenuncia/adenuncia.component'
import { LogComponent} from './log/log.component'
import { ReportesComponent } from './reportes/reportes.component' 
export const admin_routes: Routes = [
    //{ path: 'admin', component: AdminnComponent },
    { path: 'home', component: HomeComponent },
    { path: 'category/:id', component: AcategoryComponent },
    { path: 'denuncia', component: AdenunciaComponent },
    { path: 'log', component: LogComponent },
    { path: 'reportes', component: ReportesComponent },
    
    {path: '**', pathMatch: 'full', redirectTo: 'admin'}
  ];