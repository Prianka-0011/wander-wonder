import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserprofileComponent } from './views/userprofile/userprofile.component';
import { DestinationListComponent } from './views/destination-list/destination-list.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"profile",
    component: UserprofileComponent
  },
  {
    path:"destinations",
    component: DestinationListComponent
  },
  {
    path:"register",
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
