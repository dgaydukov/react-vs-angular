# React Admin Panel

##This is react cms system for creating spa websites

### Run local
just run this code to develop locally
```npm install``` and   ```npm start```

##Whenever you change files or add images rebuild happens.

##The structure of app is
 - app
    - server.js //node server
 - npm //folder with npm run scripts and webpack config
 - src //raw react project files
 - build //folder with bundled project. When deploy, just run ```npm run zip``` and copy zip to nginx server. In order of proper work nginx should serve static and all other request redirect to index.html. See details in app/server.js

### Create modules
To create module with name slider run this command
```npm run module --name=slider```

### Deployment2
To deploy run
 ```npm run zip```

### Working with nginx repository
Create bitbucket repository and add build folder to it
```
cp build/ static
cd static/
git init
git remote add origin ssh://git@bitbucket.org/payqr_frontend/websdk.bonusclub.static.git
git add .
git commit -m "Initial commit"
git push origin master
```
After this you can push your build into repo with command
```npm run gitpush ='bug fix'```

###To work with project, clone from this repository, then create your own and change origin
```git remote set-url origin git@bitbucket.org:{user}/{repository}.git```