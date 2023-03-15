const mongoose=require('mongoose')

const restaurantSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    cityName:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    thumb:{
        type:String
    },
    cost:{
        type:Number
    },
    address:{
        type:String
    },
    type:{
        type:Array
    },
    Cuisine:{
        type:Array
    }
})

module.exports=mongoose.model("Restaurants",restaurantSchema,"restaurant")