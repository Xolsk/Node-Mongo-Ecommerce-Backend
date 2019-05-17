const orders = require("../Models/Orders.js")
const stripe = require("stripe")("sk_test_agVn2kCpEU3W4M8KnXiFACj100QoTKQrkh");
const updateStock = require ("../helpers/updateStock.js");
const orderEmail = require ("../helpers/orderEmail.js");

class OrdersController {

    async purchase (req, res) {
        try {
            const result = await stripe.charges.create(req.body);
            res.status(200).send({ result })
        }
        catch (error) {
            res.status(500).send({ error })
        }
    }
 async create (req, res){
    
     const { userDetails, total, orderDetails } = req.body
     const taxes = (total/100)*10
     delete orderDetails.stock;
     delete orderDetails.modified;
  try{
      const length = await orders.count()
      const order = await orders.create({
          number:length, client:userDetails, orderDetails:orderDetails, amount:total, taxes:taxes
    
      })
     orderEmail (userDetails, total, orderDetails)
     updateStock(res, orderDetails)
  }
catch (error){ res.send ({error})}
 }
}

module.exports = new OrdersController;