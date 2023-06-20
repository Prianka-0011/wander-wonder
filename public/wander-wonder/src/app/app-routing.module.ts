import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UserprofileComponent } from './views/userprofile/userprofile.component';
import { DestinationListComponent } from './views/destination-list/destination-list.component';
import { RegisterComponent } from './views/register/register.component';
import { AdminDestinationListComponent } from './views/admin-panel/admin-destination-list/admin-destination-list.component';
import { DestinatinationDetailComponent } from './views/destinatination-detail/destinatination-detail.component';
import { AdminDestinationDetainComponent } from './views/admin-destination-detain/admin-destination-detain.component';
import { AdminDashboardComponent } from './views/admin-dashboard/admin-dashboard.component';

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
    path:"destinations/:destinationId",
    component: DestinatinationDetailComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  { path: 'admin', component: AdminDashboardComponent, children: [
    { path: 'destinations', component: AdminDestinationListComponent },
    {
      path:"destinations/add",
      component: AdminDestinationDetainComponent
    },
    {
      path:"destinations/:destinationId",
      component: AdminDestinationDetainComponent
    }
  ]
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
