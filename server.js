const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('curyear', ()=>{ return new Date().getFullYear()});
hbs.registerHelper('cupitalize', (text)=>{ return text.toUpperCase()});
app.set('view engine', 'hbs'); 
app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `now is ${now} and ${req.method} and ${req.url}` + '\n';
	console.log(log);
	fs.appendFile('log.log', log, (err)=>{
		if(err)
			console.log('Some error' + err)});
	next();  
});
// app.use((req, res, next)=>{
// 	res.render('maintain.hbs',
// 	{
// 		pageTitle:"maintainance"
// 	}); 
// });
app.get('/', (req, resp)=>{
	// resp.send('<h1>Hello world</h1>');
	resp.render('home.hbs',
		{
			pageTitle:"Start page",
			name:'Yul Kh'
		});
});
app.get('/about', (req, resp)=>{
	resp.render('about.hbs',
		{
			pageTitle:"About page title"
		});
	
});
app.get('/bad', (req, resp)=>{
	resp.send(
		{
			errorMessage:'Not good'
		});
});
app.get('/contacts', (req, resp)=>{
	resp.render('contacts.hbs',
		{
			pageTitle:"Contacts"
		});
});
app.listen(port,()=>{console.log(`Server start on port ${port}`)});