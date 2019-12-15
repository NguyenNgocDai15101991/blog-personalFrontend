import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
loginForm: FormGroup;
check: string;
  constructor(private formbuider: FormBuilder, private userService: UserService, private cookie: CookieService, private  router: Router) { }

  ngOnInit() {
    this.loginForm = this.formbuider.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }
  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.signIn(this.loginForm.value).subscribe(next => {
      this.cookie.set('username', next.username);
      this.cookie.set('token', next.accessToken);
      this.check = 'true';
      this.userService.userOnline.username = this.loginForm.get('username').value;
      this.router.navigate(['blogHome']);
    }, error1 => {
      this.cookie.delete('username');
      this.cookie.delete('token');
      this.check = 'false';
      this.userService.userOnline.username = '';
    });
  }
}
