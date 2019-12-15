import { Component, OnInit } from '@angular/core';
import {BlogService} from '../../service/blog.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Post} from '../../interface/post';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Picture} from '../../interface/picture';
import {Category} from '../../interface/category';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  post: Post;
  sub: Subscription;
  check = false;
  updatePost: FormGroup;
  picture: Picture;
  arrayPicture: Picture[] = [];
  listCategory: Category[];
  category: Category;
  constructor(private  blogService: BlogService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private  router: Router,
              private db: AngularFireDatabase) { }

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.blogService.details(id).subscribe(next => {
        this.post = next;
      }, error => {
        console.log(error);
      });
    });
    this.blogService.listCategory().subscribe(next => {
      this.listCategory = next;
      console.log(next);
    }, error => {
      console.log(error);
    });
    this.updatePost = this.fb.group({
      name: ['', [Validators.required]],
      content: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }
  uploadFile(event) {
    const file = event.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.picture = {id: this.post.pictures[0].id++, name: downloadURL};
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }
  transferFormDataToPost() {
    this.post = {
      id: this.post.id,
      name: this.updatePost.get('name').value,
      content: this.updatePost.get('name').value,
      category: this.category = {id: this.updatePost.get('category').value},
      pictures: this.arrayPicture,
      user: {id: 2}

    };
  }
  onSubmit() {
    this.transferFormDataToPost();
    this.blogService.createPost(this.post).subscribe(next => {
      this.router.navigate(['managerPost']);
    }, error1 => {
      this.check = true;
    });
  }
  bachToManager() {
    this.router.navigate(['managerPost']);
  }
}
