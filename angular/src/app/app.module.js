"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var heroes_component_1 = require("./heroes.component");
var hero_form_component_1 = require("./hero-form.component");
var post_component_1 = require("./http/post.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot([
                {
                    path: 'hero-list',
                    component: heroes_component_1.HeroesComponent
                },
                {
                    path: 'hero-form',
                    component: hero_form_component_1.HeroFormComponent
                },
                {
                    path: 'posts',
                    component: post_component_1.PostComponent
                }
            ])
        ],
        declarations: [
            app_component_1.AppComponent,
            heroes_component_1.HeroesComponent,
            post_component_1.PostComponent,
            hero_form_component_1.HeroFormComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map