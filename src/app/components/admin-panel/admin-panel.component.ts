import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  users!: User[];
  displayedColumns = ['UserId', 'FirstName', 'LastName', 'Email', 'RoleId', 'actions'];
  dataSource!: MatTableDataSource<User>;

  pageSize = 6;
  pageNumber = 1;

  private usersCount: number = 0;

  constructor(private userService: UserService, public dialog: MatDialog) { }



  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadData();
  }

  ngOnInit(): void {

    this.loadData();
  }

  loadData() {
    this.userService.getUsersCount()
      .subscribe((count: number) => {
        this.usersCount = count;
      });


    this.userService.getUsers(this.pageSize, this.pageNumber)
      .subscribe((data) => {

        console.log();
        this.dataSource = new MatTableDataSource(data);



      }), (err: Error) => {
        console.log(err.message + " " + err.name);

      }
  }

  public openDialog(flag: number, userId?: number, firstName?: string, lastName?: string, email?: string, password?: string, roleId?: number) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: { userId, firstName, lastName, email, password, roleId },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });


    // const dialogConfig: MatDialogConfig<{ user?: User; flag: number }> =
    // {
    //   data: {
    //     user,
    //     flag
    //   }
    // }

    // const dialogRef = this.dialog.open(UserDialogComponent, dialogConfig)

    // // console.log(flag + 'is flag');

    // dialogRef.afterClosed()
    //   .subscribe(result => {
    //     if (flag === 1) {
    //       this.loadData();
    //     }
    //   })
  }

  public get userCount(): number {
    return this.usersCount;
  }

}
