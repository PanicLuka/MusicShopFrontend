import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }

  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;
  public user!: User;


  ngOnInit(): void {
  }


  createUser() {

    this.user = {
      userId: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      roleId: this.roleId
    }

    this.userService.createUser(this.user)
      .subscribe(res => {
        console.log();

      })

  }

}
