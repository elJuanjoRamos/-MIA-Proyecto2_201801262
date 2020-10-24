import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminnComponent } from './components/dashboard/adminn/adminn.component';
import { ClientComponent } from './components/dashboard/client/client.component';


//SERVICES

import { AuthenticationService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { PersonService } from './services/person.service';
import { ProductService } from './services/product.service';



import { HomeComponent } from './components/dashboard/adminn/home/home.component';
import { AcategoryComponent } from './components/dashboard/adminn/acategory/acategory.component';
import { ChomeComponent } from './components/dashboard/client/chome/chome.component';
import { MyproductsComponent } from './components/dashboard/client/myproducts/myproducts.component';
import { MyproductsFormComponent } from './components/dashboard/client/myproducts-form/myproducts-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    AdminnComponent,
    ClientComponent,
    HomeComponent,
    AcategoryComponent,
    ChomeComponent,
    MyproductsComponent,
    MyproductsFormComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthenticationService,
    CategoryService,
    PersonService,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
