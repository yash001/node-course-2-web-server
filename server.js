const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

//var app = express
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
//hbs.registerPartials(__dirname + '/public/views/partials');
app.set('view_engine','hbs');


app.use((req,res,next) => {
 	var now = new Date().toString();
 	var log = `${now}: ${req.method} ${req.url}`;
 	
 	console.log(log);
 	fs.appendFile('server.log', log + '\n', (err) => {
 		if(err) {
 			console.log('Unable to append to server.log');
 		}
 	});
 	next();
 });

//maintenance page
// app.use((req,res,next) => {
//  	res.render('maintenance.hbs');
//  	// next();
//  });

//public directory
app.use(express.static(__dirname + '/public'));


 hbs.registerHelper('getCurrentYear',() => {
 	return new Date().getFullYear() 	
 	//return 
 });

 hbs.registerHelper('scream',(text) => {
 	return  text.toUpperCase(); 	
 	//return 
 });
 
 app.get('/',(req,res) => {
 	//res.send('<h1>Hello express!</h1>');
 	// res.send({
 		
 	// 		name: 'Andrew',
 			  
 	// 	     likes: [
 	// 	       'Biking',
 	// 	        'Citiesss'
 	// 	     ]
 			 		 
 	// 	});


 	 res.render('home.hbs', {
	pageTitle: 'home Page'
	//Message: 'Welcome to home page'
    });
 });

app.get('/about',(req,res) => {
	res.render('about.hbs', {
	pageTitle: 'about Page',
	WelcomeMessage: 'Welcome to about page'
});
});

app.get('/bad',(req,res) => {
	res.send({
	errorMessage: 'Unable to handle request'
}); 

});
app.listen(3000, () => {
	console.log("Server is up on port 3000");
});
