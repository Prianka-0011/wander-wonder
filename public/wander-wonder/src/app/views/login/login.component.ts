import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/shared/services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private  userService:UserServiceService){}
  onSubmit(form: any) {
    if (form.valid) {
      const username = form.value.username;
      const password = form.value.password;

      console.log('Login successful');
    } else {
      console.log('Form is invalid');
    }
  }
}
