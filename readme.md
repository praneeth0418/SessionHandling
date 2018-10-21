..............................................................................................................................................
What this project includes?
..............................................................................................................................................
1)signup
2)login
3)display user on screen
4)mongodb user handling
5)basic session handling


PREREQUISITES

please install mongoose, express,body-parser,connect-mongo,bcrypt before running the node.
example npm install mongoose --save


  DATABASE SETTINGS
  1)install mongo compass to view the database entries easily
  2)if you are not downloading it seperately,you need powershell 3.0 version and also .net framework. I faced few technical
  issues.Hence I've directly downloaded compass.
  3)donot change the port(if you do that, please change the port in database connectivity function also "app.js")
  4)create data/db folder in program files
  5)execute mongod
  6)execute mongo
  7)create database "interview".
  
  
...............................................................................................................................................
 What is Pending?
...............................................................................................................................................
1)display all the active sessions 
2)logout session for selected session. 





..............................................................................................................................................
What is my approach?
..............................................................................................................................................
->My idea is to use session unification process,i.e to create unique ID for every user. This helps me to get number of sessions opened by the user.
->Session data is stored in server side. so using the unique ID and IP address from which client has logged in,
we can delete the entry from the database and redirect to home.



***I,ve added the screenshots of my output.