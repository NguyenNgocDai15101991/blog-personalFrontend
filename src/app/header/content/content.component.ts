import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private userService: UserService, private cookieService: CookieService, private  router: Router) {
  }

  ngOnInit() {
    this.userService.userOnline.username = this.cookieService.get('username');
  }
  logout() {
    this.cookieService.delete('username');
    this.cookieService.delete('token');
    this.userService.userOnline.username = '';
    this.router.navigate(['login']);
  }
}
