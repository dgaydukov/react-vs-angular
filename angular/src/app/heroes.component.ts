import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Hero } from './hero';


@Component({
  selector: 'hero-list',
  template: `
    <h1>{{title}}</h1>
    <h2>My favorite hero is : {{myHero.name}}</h2>
    <p>Heroes:</p>
    <ul>
      <li *ngFor="let hero of heroes">
        {{ hero.name }}
      </li>
    </ul>
    <div>
      <input #newHero/>
      <button (click)="addHero(newHero.value)">add</button>
    </div>
    <div>postTitle: {{postTitle}}</div>
  `
})


export class HeroesComponent  {
  title: string;
  myHero: Hero;
  heroes: Hero[];
  clickMessage: string;
  postTitle: "";

  constructor(http: Http){
    this.clickMessage = "click me";
    this.title = 'Tour of Heroes';
    this.heroes = [
      new Hero(1, 'Windstorm', 'x'),
      new Hero(13, 'Bombasto', 'x'),
      new Hero(15, 'Magneta', 'x'),
      new Hero(20, 'Tornado', 'x')
    ];
    this.myHero = this.heroes[Math.floor(Math.random() * 3) + 1];

    http.get('https://jsonplaceholder.typicode.com/posts/12')
      .subscribe(res => {
        var post = res.json();
        console.log(post);
        this.postTitle = post.title;
      });
  }

  addHero(newHero: string){
    var hero = new Hero(1, newHero, 'x');
    this.heroes.push(hero);
  }
}

