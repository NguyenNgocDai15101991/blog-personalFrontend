import { Injectable } from '@angular/core';
import {UserOnline} from '../interface/user-online';
import {HttpClient} from '@angular/common/http';
import {User} from '../interface/user';
import {Observable} from 'rxjs';
import {Login} from '../interface/login';
import {UserLoginComponent} from '../manager-user/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userOnline: UserOnline = {username: ''};
  private API_URL = 'http://localhost:8080/api/auth';
  constructor(private httpClient: HttpClient) { }
  signUp(user: User) {
    return this.httpClient.post(`${this.API_URL}/signup`, user);
  }

  signIn(login: Login): Observable<UserOnline> {
    return this.httpClient.post(`${this.API_URL}/signin`, login);
  }
}

