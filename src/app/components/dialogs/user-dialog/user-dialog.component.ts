import { Component, Inject, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  public flag!: number;
  public subscription!: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    public userService: UserService) { }

  ngOnInit(): void {
    console.log();

  }

  public add(): void {
    this.userService.createUser(this.data)
      .subscribe(() => {
        this.snackBar.open('User created with name' + this.data.firstName, 'Okay', {
          duration: 2500
        });
      }),
      (err: Error) => {
        console.log(err.name + '-->' + err.message);
        this.snackBar.open('Something went wrong! Try again!', 'Close', {
          duration: 2500
        });
      }
  }

  public update(): void {
    this.userService.updateUser(this.data, this.data.userId)
      .subscribe(() => {
        this.snackBar.open('User modified to: ' + this.data.firstName, 'Okay', {
          duration: 2500
        });
      }),
      (err: Error) => {
        console.log(err.name + '-->' + err.message);
        this.snackBar.open('Something went wrong! Try again!', 'Close', {
          duration: 2500
        });
      }
  }

  public delete(): void {
    // console.log(this.data.userId);

    this.userService.deleteUser(this.data.userId)
      .subscribe(() => {
        this.snackBar.open('User successfully deleted', 'Okay', {
          duration: 2500
        });
      }),
      (err: Error) => {
        console.log(err.name + '-->' + err.message);
        this.snackBar.open('Something went wrong! Try again!', 'Close', {
          duration: 2500
        });
      }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('You gave up on changes', 'Okay', {
      duration: 1000
    });
  }



}
