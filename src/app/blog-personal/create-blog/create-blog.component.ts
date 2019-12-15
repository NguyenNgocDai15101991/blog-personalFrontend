import { Component, OnInit } from '@angular/core';
import {Post} from '../../interface/post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../service/blog.service';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Picture} from '../../interface/picture';
import {Category} from '../../interface/category';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {
post: Post;
createBlog: FormGroup;
check: string;
picture: Picture;
arrayPicture: Picture[] = [];
listCategory: Category[];
  category: Category;


  constructor(private blogservice: BlogService, private fb: FormBuilder, private db: AngularFireDatabase, private  router: Router) { }

  ngOnInit() {
    this.blogservice.listCategory().subscribe(next => {
      this.listCategory = next;
    }, error => {
      console.log(error);
    });
    this.createBlog = this.fb.group({
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
          this.picture = {name: downloadURL};
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }

onSubmit() {
     this.transferFormDataToPost();
     console.log(this.post);
     this.blogservice.createPost(this.post).subscribe(next => {
       this.check = 'true';
       this.router.navigate(['blogHome']);
     }, error1 => {
       this.check = 'false';
     });
}

  transferFormDataToPost() {
    this.post = {
      name: this.createBlog.get('name').value,
      content: this.createBlog.get('name').value,
      category: this.category = {id: this.createBlog.get('category').value},
      pictures: this.arrayPicture,
      user: {id: 2}
    };
  }
  bachToHome() {
    this.router.navigate(['blogHome']);
  }
}
