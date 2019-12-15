import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../interface/post';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Category} from '../interface/category';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private API_URL = 'http://localhost:8080/post';
  private API_URL_CATEGORY = 'http://localhost:8080/category';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  showListPost(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API_URL}/list`);
  }

  listCategory(): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
    return this.http.get<Category[]>(`${this.API_URL_CATEGORY}/list`, {headers});
  }

  createPost(post: Post) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
    return this.http.post(`${this.API_URL}/add`, post , {headers});
  }
  details(id: string): Observable<Post> {
   return  this.http.get<Post>(`${this.API_URL}/${id}`);
  }
  deletePost(id: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
    return this.http.delete(`${this.API_URL}/delete/${id}`, {headers});
  }

  findAllPostByUser(): Observable<Post[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.cookieService.get('token')
    });
    return this.http.get<Post[]>(`${this.API_URL}/findAllByUser`, {headers});
   }
}
