import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public get userBindingObject(): User {
    return this.user;
  }

  public user!: User;
  email!: string;
  firstName!: String;
  surname!: String;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.email = this.userService.getCurrentUserEmail();

    this.userService.getUserByEmail(this.email)
      .subscribe(res => {
        this.user = res;
        if (res.firstName !== null) {
          this.firstName = res.firstName;


        }
        if (res.lastName !== null) {
          this.surname = res.lastName;
        }
      }), (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

  }

  updateUser() {
    this.userService.updateUser(this.user as User, this.user.userId as number)
      .subscribe(res => {
        this.user = res;
      }), (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
    // console.log(this.user);

  }

  logOut() {
    localStorage.removeItem('JWT_NAME');
    this.router.navigate(['/login'])
  }

}
