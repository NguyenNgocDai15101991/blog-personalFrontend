import { Component, OnInit } from '@angular/core';
import {Post} from '../../interface/post';
import {BlogService} from '../../service/blog.service';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager-blog',
  templateUrl: './manager-blog.component.html',
  styleUrls: ['./manager-blog.component.css']
})
export class ManagerBlogComponent implements OnInit {
  posts: Post[];
  constructor(private blogService: BlogService, private userService: UserService, private  router: Router) { }

  ngOnInit() {

    this.blogService.findAllPostByUser().subscribe(next => {
      this.posts = next;
    }, error => {
      console.log(error);
    });
  }
  bachToHome() {
    this.router.navigate(['blogHome']);
  }
}
