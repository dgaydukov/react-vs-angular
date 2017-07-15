"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var hero_1 = require("./hero");
var HeroesComponent = (function () {
    function HeroesComponent(http) {
        var _this = this;
        this.clickMessage = "click me";
        this.title = 'Tour of Heroes';
        this.heroes = [
            new hero_1.Hero(1, 'Windstorm', 'x'),
            new hero_1.Hero(13, 'Bombasto', 'x'),
            new hero_1.Hero(15, 'Magneta', 'x'),
            new hero_1.Hero(20, 'Tornado', 'x')
        ];
        this.myHero = this.heroes[Math.floor(Math.random() * 3) + 1];
        http.get('https://jsonplaceholder.typicode.com/posts/12')
            .subscribe(function (res) {
            var post = res.json();
            console.log(post);
            _this.postTitle = post.title;
        });
    }
    HeroesComponent.prototype.addHero = function (newHero) {
        var hero = new hero_1.Hero(1, newHero, 'x');
        this.heroes.push(hero);
    };
    return HeroesComponent;
}());
HeroesComponent = __decorate([
    core_1.Component({
        selector: 'hero-list',
        template: "\n    <h1>{{title}}</h1>\n    <h2>My favorite hero is : {{myHero.name}}</h2>\n    <p>Heroes:</p>\n    <ul>\n      <li *ngFor=\"let hero of heroes\">\n        {{ hero.name }}\n      </li>\n    </ul>\n    <div>\n      <input #newHero/>\n      <button (click)=\"addHero(newHero.value)\">add</button>\n    </div>\n    <div>postTitle: {{postTitle}}</div>\n  "
    }),
    __metadata("design:paramtypes", [http_1.Http])
], HeroesComponent);
exports.HeroesComponent = HeroesComponent;
//# sourceMappingURL=heroes.component.js.map