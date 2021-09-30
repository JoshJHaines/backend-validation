# Validation Intro

Install Mongo following steps at [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/). Use Brew to install and start Mongo DB.

## Requirements

* [Node](https://nodejs.org/en/download/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [GitHub](https://www.github.com)
* [Express](https://expressjs.com/)
* [Express_Generator](https://www.npmjs.com/package/express-generator/)
* [Morgan](https://www.npmjs.com/package/morgan)
* [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
* [Mongoose](https://mongoosejs.com/)
* [BcryptJS](https://www.npmjs.com/package/bcryptjs)
* [ValidatorJS](https://www.npmjs.com/package/validator)


## Overview
Express generator will pre-make the server, folders and routes structure for you.



### In Terminal
First you will need to initialize/create the application. Create the directory where you would like this to live. Once you are in your new directory: 

1. install express generator ```npm i express-generator -g```  
   1. this sets it globally, only need to run once on your computer
2. Start your project ```express "project-name-here" --view=ejs```
3. cd into the project directory
4. Run  ```npm init```
5. Run ```npm i mongoose```
6. Run ```npm i bcryptjs```
7. Run ```npm i validator```
8. Run ``` touch .gitignore``` 
   1. Add ```/node_modules``` to the file.
9. Connect to or init git repo
10. Run ```touch README.md``` as needed/desired

## Create Git Repo

### GitHub
1. Create new repo with app name
2. Do not add readme or anything.
   1. You can add this via terminal if needed. 

### In Terminal
1. Run ```git init```
2. Run ```git add .```
3. Run ```git commit -m "first commit"```
4. Run ```git remote add origin https://github.com/'USERNAME'/'repo-name'.git```
   1. This URL can be copied directly from the GitHub Repo
5. Push files to Repo
   1. Run ```git push --set-upstream origin master```
- 'git push' will throw an error
- 'git push origin master' will push to your repo only once. You need to set the upstream to continually push.


## Delete Items
Remove items that we will not use. At this point of class, this will be your VIEWS folder. These items were added by the Express Generator.

### App.js
1. Comment or delete out lines 3,12,13,14,20
   
## Add Mongo DB
Now we are going to connect our application to a database. 
### App.js
1. Under logger = morgan... add
``` javascript
var mongoose = require('mongoose');
```
2. Then under users Router add
``` javascript
mongoose.connect("mongodb://localhost:27017/'database-name'",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MONGODB CONNECTED")
})
.catch(() => {
  console.log(e)
})
```
