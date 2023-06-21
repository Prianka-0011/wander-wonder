import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { DestinationListComponent } from './views/destination-list/destination-list.component';
import { DestinationService } from './shared/services/destination-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { UserprofileComponent } from './views/userprofile/userprofile.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AdminDestinationListComponent } from './views/admin-panel/admin-destination-list/admin-destination-list.component';
import { DestinatinationDetailComponent } from './views/destinatination-detail/destinatination-detail.component';
import { AdminDestinationDetailComponent } from './views/admin-panel/admin-destination-detail/admin-destination-detail.component';
import { AdminDashboardComponent } from './views/admin-panel/admin-dashboard/admin-dashboard.component';
import { SideBarComponent } from './views/side-bar/side-bar.component';
import { DestinationComponent } from './shared/components/destination/destination.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthInterceptorInterceptor } from 'healper/auth-interceptor.interceptor';
import { FavoritesComponent } from './views/favorites/favorites.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DestinationListComponent,
    LoginComponent,
    RegisterComponent,
    UserprofileComponent,
    HeaderComponent,
    AdminDestinationListComponent,
    DestinatinationDetailComponent,
    AdminDestinationDetailComponent,
    AdminDashboardComponent,
    SideBarComponent,
    DestinationComponent,
    FooterComponent,
    FavoritesComponent,
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
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
