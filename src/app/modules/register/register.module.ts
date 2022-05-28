import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/user.service';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [
    UserService
  ]
})
export class RegisterModule { }
