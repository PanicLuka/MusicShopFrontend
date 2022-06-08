import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { JwtHelperService, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UploadComponent } from './components/upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    FilterPipe,
    ViewProductComponent,
    ProfileComponent,
    AddProductComponent,
    UploadComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatPaginatorModule
  ],
  providers: [
    UserService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ProductsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
