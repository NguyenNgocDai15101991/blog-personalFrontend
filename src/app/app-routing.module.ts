import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BlogHomeComponent} from './blog-personal/blog-home/blog-home.component';
import {CreateUserComponent} from './manager-user/create-user/create-user.component';
import {UserLoginComponent} from './manager-user/user-login/user-login.component';
import {CreateBlogComponent} from './blog-personal/create-blog/create-blog.component';
import {BlogDetailsComponent} from './blog-personal/blog-details/blog-details.component';
import {ManagerBlogComponent} from './blog-personal/manager-blog/manager-blog.component';
import {DeleteBlogComponent} from './blog-personal/delete-blog/delete-blog.component';
import {UpdateBlogComponent} from './blog-personal/update-blog/update-blog.component';



const routes: Routes = [{
  path: 'blogHome',
  component: BlogHomeComponent
},
  {
    path: 'register',
    component: CreateUserComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'blogHome/createBlog',
    component: CreateBlogComponent
  },
  {
    path: 'blogHome/details/:id',
    component: BlogDetailsComponent
  },
  {
    path: 'managerPost',
    component: ManagerBlogComponent
  },
  {
    path: 'managerPost/deletePost/:id',
    component: DeleteBlogComponent
  },
  {
    path: 'managerPost/updatePost/:id',
    component: UpdateBlogComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
