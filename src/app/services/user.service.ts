import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';

export const JWT_NAME = 'token';



@Injectable()
export class UserService {

  public get token(): string {
    return this.getToken();
  }

  public get currentUserRole(): string {
    return this.getCurrentUserRole();
  }


  private URL = environment.musicShop_URL;
  constructor(private httpClient: HttpClient, private jwtHelper: JwtHelperService) { }

  public loginUser(login: Login): Observable<any> {
    return this.httpClient.post<Login>(`${this.URL}/api/login`, login);

  }

  public getUsers(pageSize: number, pageNumber: number): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}/users`, {
      params: {
        pageSize: pageSize,
        pageNumber: pageNumber
      }
    });
  }

  public getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/users/${userId}`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/api/users/user/${email}`);
  }

  public getUsersCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.URL}/users/count`);
  }
  public createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.URL}/api/users`, user);
  }

  public updateUser(user: User, userId: number): Observable<User> {
    return this.httpClient.put<User>(`${this.URL}/api/users/${userId}`, user);
  }

  public deleteUser(userId: number): Observable<User> {
    return this.httpClient.delete<User>(`${this.URL}/users/${userId}`);
  }

  public getToken(): string {
    const token = localStorage.getItem("JWT_NAME");

    if (!this.jwtHelper.isTokenExpired(token!)) {
      return token!;
    }
    else {
      return '';
    }

  }

  public getCurrentUserRole(): string {
    let token = localStorage.getItem("JWT_NAME");
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    let role = decodedJWT['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return role;
  }

  public getCurrentUserEmail(): string {
    let token = localStorage.getItem("JWT_NAME");
    let decodedJWT = JSON.parse(window.atob(token!.split('.')[1]));

    let email = decodedJWT['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
    return email;
  }



}
