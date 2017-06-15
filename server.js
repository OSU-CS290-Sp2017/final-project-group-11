
//get yo' node.js packages, yeah
var express = require('express');
var express_handlebars = require('express-handlebars');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express(); //use app for all your express stuff

var article_data = require("./articles.json"); //json file goes here, use article_data to obtain data for wiki pages

//allows for diff port number functionality
var port_num = 3000;
if(process.argv[2] == 'PORT' && process.argv.length > 3){
	port_num = process.argv[3];
}

//file syncing, obtains the handlebar page templates
var main_page_template = fs.readFileSync('./views/mainPage.handlebars');
var article_page_template = fs.readFileSync('./views/404Page.handlebars');


//renders the main.handlebars stuff, default layout
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//this bad boy below handles dudes and dudettes wanting the main page like a boss
app.get('/', function(req,res,next){
	var args = {
		article_data: article_data
	}
	res.render('mainPage', args);
})

//this bad boy below handles errors like a boss
app.get('/articles/:index', function(req,res,next){
	//console.log(req.params.index);
	var has_article = article_data[req.params.index];

	//console.log(article_data[req.params.index].title);
	//console.log(article_data[req.params.index].content);
	//console.log(article_data[req.params.index].author);
	//console.log(article_data[req.params.index].image);

	if(has_article){
		var args = {
			title: article_data[req.params.index].title,
			content: article_data[req.params.index].content,
			author: article_data[req.params.index].author,
			image: article_data[req.params.index].image
		};
		res.render('articlePage', args);
		}
	else{
		next();
	}
})

//this good boy below handles errors like a boss
app.get('*', function(req,res){
	res.statusCode = 404;
	var args = {
		//put args we want inside here if any
	}
	res.render('404Page', args);
})

// attempted post call but ran out of time
app.post('/articles/addArticle', function(req, res, next){
	var article = article_data;
	console.log(article_data);
		console.log("in the server functon thing");
	// var article = articles[req.params.index];

	if(article){
		console.log(req.body);
		if(req.body){
			var newArticle = {
				title: req.body.title,
				content: req.body.content,
				description: req.body.description,
				author: req.body.author,
				image: req.body.image
			};
			article = article || [];

			article.push(newArticle);
			fs.writeFile('articles.json', JSON.stringify(article_data), function(err){
				if(err) {
					res.status(500).send("Unable to save to database");
				}else{
					res.status(200).send();
				}
			});
		}else {
			res.status(400).send("missing a Title");
		}

	}else {
		next();
	}
	});

//listen listen listen shhh
app.listen(port_num, function(){
	console.log("Yeaaaaaahhhhh KZR900 Babyyyyyy Listening on port", port_num);
})
