import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide: boolean = true;
  invalidRegister!: boolean;
  invalidRegisterMessage!: boolean;
  isLoading = false;
  showSpinner = false;
  user!: User;
  registerCredentials: User = { email: "", firstName: "", lastName: "", password: "", userId: 0, roleId: 1 };

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    console.log();
  }

  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  onSignUp(form: FormGroup) {
    if (!this.registerForm.valid) {
      return;
    }

    this.registerCredentials.firstName = form.value.firstName;
    this.registerCredentials.lastName = form.value.lastName;
    this.registerCredentials.email = form.value.email;
    this.registerCredentials.password = form.value.password;

    this.userService.createUser(this.registerCredentials)
      .subscribe(res => {
        console.log();

        this.invalidRegister = false;
        this.invalidRegisterMessage = false;

        form.reset();

        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.router.navigate(['/login']);
        }, 1500)


      }), (error: Error) => {
        this.invalidRegister = true;
      }
  }

  navigate() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
      this.router.navigate(['/login']);
    }, 1200)
  }
  removeMessage() {
    this.invalidRegister = true;
  }






}
