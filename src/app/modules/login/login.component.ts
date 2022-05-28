import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  invalidLogin!: boolean;
  email!: string;
  password!: string;
  invalidLoginMessage!: boolean;
  user!: User;
  loginCredentials: Login = { email: "", password: "" }
  isLoading = false;
  showSpinner = false;


  constructor(private router: Router, public userService: UserService, private formBuilder: FormBuilder) {

  }



  ngOnInit(): void {

    // console.log("Login page is loading!")
  }

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  onLogin(form: FormGroup) {
    if (!this.loginForm.valid) {
      return;
    }

    this.loginCredentials.email = form.value.email;
    this.loginCredentials.password = form.value.password;

    this.userService.loginUser(this.loginCredentials)
      .subscribe((response) => {
        const token = response
        localStorage.setItem("JWT_NAME", token);

        this.invalidLogin = false;
        this.invalidLoginMessage = false;

        form.reset();

        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.router.navigate(['/home']);
        }, 1500)



      }), (error: Error) => {
        this.invalidLogin = true;
      }


  }

  navigate() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.router.navigate(['/register']);
    }, 1200)
  }
  removeMessage() {
    this.invalidLogin = true;
  }

}
