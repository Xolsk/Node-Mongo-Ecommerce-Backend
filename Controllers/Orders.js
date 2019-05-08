const orders = require("../Models/Orders.js")
const stripe = require("stripe")("sk_test_agVn2kCpEU3W4M8KnXiFACj100QoTKQrkh");

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
  try{
      const length = await orders.count()
      const order = await orders.create({
          number:length, client:userDetails, orderDetails:orderDetails, amount:total, taxes:taxes
    
      })
      console.log(order)
  res.send ({ok:true, order})
  }
catch (error){ res.send ({error})}
 }
}

module.exports = new OrdersController;