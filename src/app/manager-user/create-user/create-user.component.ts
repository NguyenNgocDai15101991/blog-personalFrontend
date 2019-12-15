import { Component, OnInit } from '@angular/core';
import {User} from '../../interface/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Login} from '../../interface/login';
import {UserService} from '../../service/user.service';
import {CookieService} from 'ngx-cookie-service';
import {error} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  user: User;
  createUserForm: FormGroup;
  check = '';
  login: Login;
  constructor(private fb: FormBuilder, private userService: UserService, private cookieService: CookieService, private  router: Router) { }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }
  ngOnInit() {
    this.createUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.checkPasswords});
  }
onSubmit() {
    if (this.createUserForm.valid) {
      this.transferFormDataToUser();
      this.userService.signUp(this.user).subscribe(next => {
        this.check = 'true';
        this.router.navigate(['login']);

      }, error1 => {
        this.check = 'false';
      });
    }
}

  transferFormDataToUser() {
    this.user = {
      name: this.createUserForm.get('name').value,
      username: this.createUserForm.get('username').value,
      email: this.createUserForm.get('email').value,
      password: this.createUserForm.get('password').value,
      role: ['user']
    };
  }
}
