import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup ;
  user!: User;
  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }
  onSubmit()
  {
    this.user = new User();
    this.user._name = this.registrationForm.get('name')?.value;
    this.user._username = this.registrationForm.get('username')?.value;
    this.user._password = this.registrationForm.get('password')?.value;
    console.log(this.user)
    this.authenticationService.register(this.user).subscribe({
      next: (user) => {
        console.log("", user);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}

