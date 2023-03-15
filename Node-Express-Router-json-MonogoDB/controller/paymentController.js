const Razorpay = require('razorpay')

var instance = new Razorpay({
    key_id: 'rzp_test_RB0WElnRLezVJ5',
    key_secret: 'VLMCIrqKxRMNR9EcRcbL2UG8',
  });

module.exports.getOrderId = (request,response) =>{
    let {amount} = request.body;
    var options = {
        amount: amount * 100,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        if(err){
            response.status(500).send({status:false})
        }else{
            response.status(200).send({status:true,order})
        }
      });
}