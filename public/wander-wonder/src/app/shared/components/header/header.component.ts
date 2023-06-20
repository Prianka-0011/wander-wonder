import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  countryName: string=""
  isLoginStatus: boolean = false;
  isAdmin: boolean = false
  private subscription!: Subscription;

  constructor(private authService: AuthenticationService,  private _router: Router) {}

  ngOnInit(): void {
    this.isLogIn();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isLogIn() {
    this.subscription = this.authService.isLoginStatus.subscribe(status => {
      this.isLoginStatus = status;
    });
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    this._router.navigate(["login"]);
    this.authService.isLoggedIn();

  }
  onSubmit(searchForm: NgForm) {
    this._router.navigate(['/destinations'], { queryParams: { search: this.countryName } });    
  }
}
