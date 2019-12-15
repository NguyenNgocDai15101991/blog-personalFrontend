import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../service/blog.service';
import {Post} from '../../interface/post';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {
posts: Post[];
  constructor(private blogService: BlogService, private userService: UserService) { }

  ngOnInit() {

    this.blogService.showListPost().subscribe(next => {
      this.posts = next;
    }, error => {
      console.log(error);
    });
  }

}
