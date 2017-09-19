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

app.get("/", function(req, res) {
  res.render('index', {})
})
app.get("/waiter/:name", function(req, res) {
  var waiter = req.params.name;
  var msg = ' Welcome ' + waiter

  res.render('waiter', {
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
  res.render("waiter", {
    msg: message,
    days: days
  })
});

function colorHighLight(color) {
  if (color === 3) {
    return "color1"
  } else if (color < 3) {
    return "color2"
  } else if (color > 3) {
    return "color3"
  }
}

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

  var color = '';

  models.waiterinfo.find({}, function(err, waiterShifts) {
    if (err) {
      return next(err);
    } else {
      waiterShifts.forEach(function(waiterShift) {
        waiterShift.days.forEach(function(day) {
          dailyWaiter[day].waiters.push(waiterShift.name)
        })
      })

    }
    res.render("admin", {
      data: dailyWaiter,
      monday: colorHighLight(dailyWaiter.Monday.waiters.length),
      tuesday: colorHighLight(dailyWaiter.Tuesday.waiters.length),
      wednesday: colorHighLight(dailyWaiter.Wednesday.waiters.length),
      thursday: colorHighLight(dailyWaiter.Thursday.waiters.length),
      friday: colorHighLight(dailyWaiter.Friday.waiters.length),
      saturday: colorHighLight(dailyWaiter.Saturday.waiters.length),
      sunday: colorHighLight(dailyWaiter.Sunday.waiters.length)
    });
  })

});

app.get("/waiters/reset", function(req, res, next) {

  models.waiterinfo.remove({}, function(err, result) {
    if (err) {
      return next(err)
    } else {
      res.render('index', {});
    }
  });
});
var port = process.env.PORT || 3003

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
