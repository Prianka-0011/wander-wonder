import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  user: User = new User()
  constructor(private  authencationService: AuthenticationService, private _router: Router){}
  onSubmit(form: any) {
    if (form.valid) {
      console.log("user for login", this.user);
      this.authencationService.login(this.user).subscribe({
        next:(response) => {
          //console.log(response);
          if(response.data) {
            localStorage.setItem("token", response.data);
            this._router.navigate(["profile"]);
          }
        },
        error:(err) => {
          console.log(err)
        }
      });
      //console.log('Login successful');
    } else {
      console.log('Form is invalid');
    }
  }
}
