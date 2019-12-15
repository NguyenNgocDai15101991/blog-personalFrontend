import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'blogPersonalFrontend';

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {
   this.router.navigate(['blogHome']);
  }


}
