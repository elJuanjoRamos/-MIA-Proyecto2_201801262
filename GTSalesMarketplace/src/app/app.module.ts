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
import { LoggService } from './services/log.service';
import { CarritoService } from './services/carrito.service';
import { FacturaService } from './services/factura.service';



import { HomeComponent } from './components/dashboard/adminn/home/home.component';
import { AcategoryComponent } from './components/dashboard/adminn/acategory/acategory.component';
import { ChomeComponent } from './components/dashboard/client/chome/chome.component';
import { MyproductsComponent } from './components/dashboard/client/myproducts/myproducts.component';
import { MyproductsFormComponent } from './components/dashboard/client/myproducts-form/myproducts-form.component';
import { ProductsComponent } from './components/dashboard/client/products/products.component';
import { ProductDetailComponent } from './components/dashboard/client/product-detail/product-detail.component';
import { DenunciaComponent } from './components/dashboard/client/denuncia/denuncia.component';
import { AdenunciaComponent } from './components/dashboard/adminn/adenuncia/adenuncia.component';
import { CarritoComponent } from './components/dashboard/client/carrito/carrito.component';
import { InvoiceComponent } from './components/dashboard/client/invoice/invoice.component';
import { InvoiceDetailComponent } from './components/dashboard/client/invoice-detail/invoice-detail.component';
import { LogComponent } from './components/dashboard/adminn/log/log.component';

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
    CarritoComponent,
    InvoiceComponent,
    InvoiceDetailComponent,
    LogComponent,
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
    ComentarioService,
    LoggService,
    CarritoService,
    FacturaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
