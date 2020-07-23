var express = require("express");

var todoController = require('./controllers/todoController');

var app = express();


// set up template engine
app.set('view engine','ejs');

// static files --inbuilt  middleware
app.use(express.static('./public'))

//Routes
todoController(app);


app.listen(8000);
console.log("Server Is Online 127.0.0.1:8000");