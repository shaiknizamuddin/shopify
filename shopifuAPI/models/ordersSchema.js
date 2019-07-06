/**
 * @author nizamuddin407@gmail.com
 */

var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ordersSchema = new schema({
  created_date: { type: Date },
  order: { type: Object, default: {} }
});

module.exports = mongoose.model("Orders", ordersSchema);
