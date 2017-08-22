# Application Description

## Why
Well, because AdminPanel is very powerfull tool to show all the beauty of Frontend solutions, yet it very consice to be a pet project.
At the same time, it's very useful. You can use it as a scratch project to start your own adminpanel in you development.

## The Point of App
AdminPanel is very useful in any case.
Suppose you are a b2b logistic company that provide products for others compnanies and you also has your own b2c solutions. So you are kind of b2b+b2c company with your own e-shop.
As as b2c you have a simple site where your need to manage FAQ and Products (in reasl site you will have more functionality, but these two are quite enough for our purpose).
As a b2b you have a dozens of companies who manage their products in your adminpanel.
So basically Adminpanel provide functionality to manage FAQ and produts.

## App Structure
Application will consist of following modules
```
auth
-register
--register yourself
--select your company(create new if doesn't exists)
-login
-FAQ CRUD
-Products CRUD
-companies R(readonly)
-users CRUD
--confirm of new users and companies
-roles CRUD
-feedback(for companies to talk with you)
```