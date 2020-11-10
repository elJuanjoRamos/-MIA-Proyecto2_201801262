import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminnComponent } from './components/dashboard/adminn/adminn.component';
import { admin_routes } from './components/dashboard/adminn/admin.routes';
import { ClientComponent } from './components/dashboard/client/client.component';
import { client_routes } from './components/dashboard/client/client.routes';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component'
import { RecpasswordComponent } from './components/recpassword/recpassword.component';


const routes: Routes = [
  { path: 'dashboard/admin', component: AdminnComponent, children: admin_routes },
  { path: 'dashboard/client', component: ClientComponent, children: client_routes },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'recovery', component: RecpasswordComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
