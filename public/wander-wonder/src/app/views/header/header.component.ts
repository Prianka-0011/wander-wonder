import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{
  countryName: string=""
  isLoginStatus!: boolean;
  constructor(private authService: AuthenticationService,  private _router: Router) {}

  ngOnInit(): void {
    this.isLogIn()
  }

  isLogIn() {
    this.isLoginStatus = this.authService.loggedInStatus;
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    this._router.navigate(["login"]);
  }
  onSubmit(searchForm: NgForm) {
    console.log(this.countryName)
    let query = "";
    let offset = 0;
    let count = 4;
    query+= "offset="+offset;
    query+= "&count="+count;
    query+= "&search="+this.countryName
    // this.destinationService.getAllByCountry(query).subscribe({
    //   next:(destination) => {
    //     console.log(destination);
    //   }
    // })
  }
}
