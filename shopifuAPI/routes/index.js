/**
 * @author nizamuddin407@gmail.com
 */

var express = require("express");
var router = express.Router();
var ordersModel = require("../models/ordersSchema");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("Bharosaa.tk Backend services");
});

/**
 * @description The following service is used to create a order and save it in DB `Orders` collection
 * @param The data we get from shopify webhook on a new order creation
 */

router.post("/order/create", (req, res) => {
  if (req.body) {
    var orderData = new ordersModel({
      order: req.body,
      created_date: new Date()
    });
    orderData.save((err, result) => {
      if (!err || result) {
        res.send({ status: "success", data: result, code: 200 });
      } else {
        res.send({ status: "failure", data: err });
      }
    });
  }
});

/**
 * @description The following service is used to list all the existing orders in DB
 */

router.get("/order/fetch", (req, res) => {
  var project = {
    "order.phone": 1,
    "order.email": 1,
    "order.line_items": 1,
    "created_date": 1
  };

  ordersModel.find({}, project).exec((err, result) => {
    if (!err || result) {
      res.send({ status: "success", data: result });
    } else {
      res.send({ status: "failure", data: err });
    }
  });
});

/**
 * @description The following service is used to edit the existing orders in DB
 * @param update record based on `_id`
 */

router.put("/order/update/:id", (req, res) => {
  var dataToUpdate = {
    "order.email": req.body.email,
    "order.phone": req.body.phone
  };

  var query = ordersModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: dataToUpdate },
    { upsert: true, new: true }
  );

  query.exec((err, result) => {
    if (!err || result) {
      res.send({ status: "successfully updated", data: result });
    } else {
      res.send({ status: "error in updating record", data: err });
    }
  });
});

module.exports = router;
