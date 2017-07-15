import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { HeroesComponent }  from './heroes.component';
import { HeroFormComponent }  from './hero-form.component';
import { PostComponent }  from './http/post.component';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'hero-list',
        component: HeroesComponent
      },
      {
        path: 'hero-form',
        component: HeroFormComponent
      },
      {
        path: 'posts',
        component: PostComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroesComponent,
    PostComponent,
    HeroFormComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }


