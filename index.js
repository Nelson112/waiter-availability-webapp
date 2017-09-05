var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
var newPlate = [];
var models = require('./models')

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

app.use(bodyParser.json());

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


app.get("/waiter/:name", function(req, res) {
  var waiter = req.params.name;
  var msg = ' Welcome ' + waiter;

  res.render('index', {
    waiter: msg
  })
})
app.post("/waiter/:name", function(req, res, next) {

  
});


var port = process.env.PORT || 3003

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
