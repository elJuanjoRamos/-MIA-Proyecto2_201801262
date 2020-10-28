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

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';


//SERVICES

import { AuthenticationService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { PersonService } from './services/person.service';
import { ProductService } from './services/product.service';
import { LikeService } from './services/like.service';
import { ComentarioService } from './services/comentario.service';



import { HomeComponent } from './components/dashboard/adminn/home/home.component';
import { AcategoryComponent } from './components/dashboard/adminn/acategory/acategory.component';
import { ChomeComponent } from './components/dashboard/client/chome/chome.component';
import { MyproductsComponent } from './components/dashboard/client/myproducts/myproducts.component';
import { MyproductsFormComponent } from './components/dashboard/client/myproducts-form/myproducts-form.component';
import { ProductsComponent } from './components/dashboard/client/products/products.component';
import { ProductDetailComponent } from './components/dashboard/client/product-detail/product-detail.component';
import { DenunciaComponent } from './components/dashboard/client/denuncia/denuncia.component';
import { AdenunciaComponent } from './components/dashboard/adminn/adenuncia/adenuncia.component';

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
    ProductsComponent,
    ProductDetailComponent,
    DenunciaComponent,
    AdenunciaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    AuthenticationService,
    CategoryService,
    PersonService,
    ProductService,
    LikeService,
    ComentarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
