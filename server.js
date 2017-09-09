/*
	================== SERVER ==================
*/

// DEPENDENCIES
// =============================================================

var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// required model
var Article = require("./models/Article.js");

// set mongoose to leverage built in JS ES6 Promises
mongoose.Promise = Promise;

// EXPRESS APP
// =============================================================

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// set up static directory 'public'
app.use("/public", express.static("./public"));

// MONGODB CONFIGURATION
// =============================================================

// mongodb local connection
// mongoose.connect("mongodb://localhost/nytreact");

// heroku mongolab connection
mongoose.connect("mongodb://heroku_qz67mp31:8ado3p8eddbdlrsanduimt8n5k@ds129344.mlab.com:29344/heroku_qz67mp31");

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Mongoose Error: ", err);
});

db.once("open", function(){
	console.log("Mongoose connection successful.");
});


// EXPRESS APP ROUTES
// =============================================================

// GET - components will query MongoDB for saved articles
app.get("/get-saved", function(req,res){

	// find all articles saved 
	Article.find({}, function(err, doc){

		if (err) {
			console.log(err);
		}
		else {

			res.json(doc);
		}
	});

});

// POST - components will save an article to the database
app.post("/save", newdoc, function(req,res){

	// save into object the new article to be added as a new Article
	// var newdoc = {};
	// newdoc.title = req.body.title;
	// newdoc.date = req.body.date;
	// newdoc.url = req.body.url;

	var newdoc = {
		title:title,
		date:date,
		url:url
	};

	// create new Article
	var newArticle = new Article(newdoc);

	// save newArticle to database
	newArticle.save(function(err, doc){
		if (err) {
			console.log(err);
		}
		else {
			res.json(doc);
		}
	});
});

// DELETE -  components will delete a saved article in the database
app.delete("/delete/:id", function(req,res){

	var deleteID = req.params.id;

	// delete the article by id
	Article.findByIdAndRemove(deleteID).exec(function(err, doc){
		res.json(doc);
	});
});

app.get("/", function(req,res){
	res.sendFile("./public/index.html");
});

// START LISTENER
// =============================================================
app.listen(PORT, function(){
	console.log("App listening on PORT " + PORT);
});