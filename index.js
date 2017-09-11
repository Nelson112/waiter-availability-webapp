var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var app = express();
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
  var msg = ' Welcome ' + waiter

  res.render('index', {
    message: msg
  })
})
app.post("/waiter/:name", function(req, res, next) {
  var days = req.body.days;
  var waiter = req.params.name;
  var message = "Hey " + waiter + " your shift has been added"
  models.waiterinfo.findOneAndUpdate({
    name: waiter
  }, {
    days: days
  }, function(err, person) {
    if (err) {
      return next(err);
    } else {
      if (!person) {
        var storedWaiters = new models.waiterinfo({
          name: waiter,
          days: days
        });
        storedWaiters.save()
      } else {
        person.save()
      }
    }
  })
  console.log(waiter);
  res.render("index", {
    msg: message,
    days: days
  })
});

app.get("/admin", function(req, res, next) {
  var dailyWaiter = {
    Monday: {
      waiters: []
    },
    Tuesday: {
      waiters: []
    },
    Wednesday: {
      waiters: []
    },
    Thursday: {
      waiters: []
    },
    Friday: {
      waiters: []
    },
    Saturday: {
      waiters: []
    },
    Sunday: {
      waiters: []
    }
  }
  models.waiterinfo.find({}, function(err, waiterShifts) {
    if (err) {
      return next(err);
    } else {
      waiterShifts.forEach(function(waiterShift) {
        waiterShift.days.forEach(function(day) {
          dailyWaiter[day].waiters.push(waiterShift.name)
        })
      })
      console.log(dailyWaiter);
    }
  });



  res.render("admin", {
    data: dailyWaiter
  })
});


var port = process.env.PORT || 3003

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
