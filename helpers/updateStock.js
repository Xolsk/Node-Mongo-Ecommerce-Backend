const admins = require("../Models/Admin.js")

const updateStock = async (res, orderDetails) => {

    orderDetails.forEach(element => {
        admins.findOne({ id: element.id }, (err, succ) => {

            let newStock= succ.stock - element.qty
            let newSold = succ.sold + element.qty
            admins.update({ id: element.id }, {
                $set: {
                    stock: newStock,
                    sold: newSold 
                }
            },(err,succ)=>{console.log(err,succ)})
        })

  
    });
    res.send({ ok: true})

}
module.exports = updateStock