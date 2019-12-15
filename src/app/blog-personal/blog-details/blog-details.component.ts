import { Component, OnInit } from '@angular/core';
import {Post} from '../../interface/post';
import {BlogService} from '../../service/blog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
post: Post;
  sub: Subscription;

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
  bachToHome(){
    this.router.navigate(['blogHome']);
  }
}
