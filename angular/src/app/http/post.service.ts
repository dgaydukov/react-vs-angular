/**
 * Created by diman on 06.06.17.
 */

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import 'rxjs/add/operator/toPromise';

import { Post } from "./post";

@Injectable()
export class PostService{
  private url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: Http){
  }

  getPosts(): Promise<Post[]>{
    return this.http.get(this.url).
      toPromise().
      then(response=>response.json() as Post[]).
      catch(this.handleError);
  }

  getPost(id: number): Promise<Post> {
    const url = `${this.url}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Post)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
