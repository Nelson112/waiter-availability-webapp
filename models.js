var mongoose = require('mongoose');
var mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/waiters";

mongoose.connect(mongoURL, {
  useMongoClient: true,
});
exports.waiterinfo = mongoose.model('waiterinfo', {
  name: String,
  days: Object

});
