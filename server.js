const express = require('express');
const hbs = require('hbs');
var app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


//express middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next();
});

//maintenance call middleware

/*app.use((req, res, next) => {
  res.render('maintenance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

//hbs helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//app gets

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    // currentYear: new Date().getFullYear(),
    welcome: 'Welcome to the home page'
  });
  //res.send('<h1>Hello Express!</h1>');
  /* res.send({
     name: 'Ricard',
     likes: ['reading',
       'webdev',
       'handball'
     ]
   });*/
});
//render about.hbs
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    //  currentYear: new Date().getFullYear()

  });
});

app.get('/bad', (req, res) => {
  res.send(
    { errorMessage: 'Unable to handle request' }

  );
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});

/*
app.listen(3000, () => {
  console.log('Server is up on port 3000')
}); //localhost
*/

