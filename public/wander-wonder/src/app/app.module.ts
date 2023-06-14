import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { DestinationListComponent } from './views/destination-list/destination-list.component';
import { DestinationService } from './shared/services/destination-service';
import {  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { UserServiceService } from './shared/services/user-service.service';
import { RegisterComponent } from './views/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationListComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DestinationService,
    UserServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
