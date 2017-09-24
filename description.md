# Project Description

## Why another react vs angular article

There are a lot of articles out there on frontend frameworks comparison.
Yet many people ask me the difference between angular and react, and what is best suits for their project.
That's why i decided to write this article.

## Project Structure
```
angular #direcotry with angular project
react #directory with react project
backend #directory with backend server.
```

* Please read [React](https://github.com/dgaydukov/react-vs-angular/blob/master/react/README.md) for React details
* Please read [Angular](https://github.com/dgaydukov/react-vs-angular/blob/master/angular/README.md) for Angular details
* Please read [Backend](https://github.com/dgaydukov/react-vs-angular/blob/master/backend/README.md) for Backend details

## App Structure

Suppose you are a b2b logistic company that provide products for others companies and you also has your own b2c solutions. So you are kind of b2b+b2c company with your own e-shop.
As as b2c you have a simple site where your need to manage FAQ and Products (in real site you will have more functionality, but these two are quite enough for our purpose).
As a b2b you have a dozens of companies who manage their products in your AdminPanel.
So basically AdminPanel provide functionality to manage FAQ and products.
Based on this we have following application structure

```
auth
    register
    register yourself
    select your company(create new if doesn't exists)
login
FAQ CRUD
Products CRUD
companies R (readonly)
users CRUD
    confirm of new users and companies
roles CRUD
feedback(for companies to talk with you)
```

## Comparing Points

To demonstrate pros and cons of both technology i will make one project in both, and we will see, how technologies solve following issues

* Bind App to already created bootstrap Admin Template
* Building process
* Caching problems (clear browser cache after every release)
* Event binding
* React propTypes vs TypeScript typed variables
* React Virtual DOM vs Angular Regular DOM
* React JSX vs Angular templates
* Redux global state vs Angular state


## Practical use

AdminPanel is very powerful tool to show all the beauty of Frontend solutions, yet it very concise to be a pet project.
At the same time, it's very useful. You can use it as a scratch project to start your own AdminPanel in you work or study.




