import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Post} from '../../interface/post';
import {Subscription} from 'rxjs';
import {BlogService} from '../../service/blog.service';

@Component({
  selector: 'app-delete-blog',
  templateUrl: './delete-blog.component.html',
  styleUrls: ['./delete-blog.component.css']
})
export class DeleteBlogComponent implements OnInit {
  post: Post;
  sub: Subscription;
  check = false;
  constructor(private  blogService: BlogService, private activatedRoute: ActivatedRoute, private  router: Router) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.blogService.details(id).subscribe(next => {
        this.post = next;
      }, error => {
        console.log(error);
      });
    });
  }
  delete() {
    this.blogService.deletePost(this.post.id).subscribe(next => {
      this.router.navigate(['managerPost']);
    }, error => {
      this.check = true;
    });
  }
  bachToManager(){
    this.router.navigate(['managerPost']);
  }
}
