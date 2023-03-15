const express=require('express')
const restaurantsController=require('../controller/restaurant')
const payment = require('../controller/paymentController')
const bodyParser=require('body-parser')

const router=express.Router()

router.get('/',restaurantsController.getAllRestaurants)
router.post('/filter/:pageNo',restaurantsController.getRestaurantByFilter)
router.get('/:cityID',restaurantsController.getRestaurantsByCity)
router.get('/details/:rName',restaurantsController.getRestaurantDetailsByName)
// router.post('',restaurantsController.addRestaurant)
// router.put('',restaurantsController.editRestaurant)
// router.delete('',restaurantsController.deleteRestaurant)
router.post('/get-order-id',payment.getOrderId)


module.exports=router;