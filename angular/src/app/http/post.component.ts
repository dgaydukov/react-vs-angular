import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Post }                from './post';
import { PostService }         from './post.service';

@Component({
  selector: 'posts',
  providers: [PostService],
  templateUrl: './post.component.html',
})

export class PostComponent implements OnInit {
  posts: Post[];

  constructor(private postService: PostService) { }

  getHeroes(): void {
    this.postService
      .getPosts()
      .then(posts => this.posts = posts);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}
