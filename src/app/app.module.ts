import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogHomeComponent } from './blog-personal/blog-home/blog-home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './header/content/content.component';
import { SearchComponent } from './header/search/search.component';
import {FooterComponent} from './header/footer/footer.component';
import {CookieService} from 'ngx-cookie-service';
import {HttpClientModule} from '@angular/common/http';
import { CreateUserComponent } from './manager-user/create-user/create-user.component';
import { UserLoginComponent } from './manager-user/user-login/user-login.component';
import { CreateBlogComponent } from './blog-personal/create-blog/create-blog.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { BlogDetailsComponent } from './blog-personal/blog-details/blog-details.component';
import { ManagerBlogComponent } from './blog-personal/manager-blog/manager-blog.component';
import { DeleteBlogComponent } from './blog-personal/delete-blog/delete-blog.component';
import { UpdateBlogComponent } from './blog-personal/update-blog/update-blog.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogHomeComponent,
    HeaderComponent,
    ContentComponent,
    SearchComponent,
    FooterComponent,
    CreateUserComponent,
    UserLoginComponent,
    CreateBlogComponent,
    BlogDetailsComponent,
    ManagerBlogComponent,
    DeleteBlogComponent,
    UpdateBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
