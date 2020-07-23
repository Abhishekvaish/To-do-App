var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mongoUri = require('./mongoUri');

//connection to mlab database
mongoose.connect(mongoUri.uri,{
	useNewUrlParser : true,
	useUnifiedTopology: true
},function(err){
	if (err){
		console.log(err);
	}else{
		console.log("Connected To The database");
	}
});

//create a schema
var todoSchema = new mongoose.Schema({
	item : String
});

// create a Model
var Todo = mongoose.model('Todo',todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

	app.get('/',function(req,res){
		// get data from mongodb
		Todo.find({},function(err,data){ 
			if (err) throw err;
			res.render('index',{todos:data});
		}); 
	});

	app.post('/', urlencodedParser ,function(req,res){
		// add item to database
		var todo  = Todo(req.body).save(function(err,data){
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete('/:item',function(req,res){
		// delete item from database
		Todo.find({item:req.params.item.replace(/\-/g," ")})
		.remove(function(err,data){
			if (err) throw err;
			res.json(data);
		});
		/*
		data = data.filter(function(todo){
			return todo.item.replace(/ /g,'-') !== req.params.item;
		});
		res.json(data);
		*/
	});

};