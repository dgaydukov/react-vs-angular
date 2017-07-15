import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <div><a routerLink="/hero-list">hero-list</a></div>
    <div><a routerLink="/hero-form">hero-form</a></div>
    <div><a routerLink="/posts">posts</a></div>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Routing component';
}
