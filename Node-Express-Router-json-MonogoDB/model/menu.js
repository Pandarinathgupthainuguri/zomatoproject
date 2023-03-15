const mongoose=require('mongoose')

const MenuSchema=mongoose.Schema({
restaurantId:{
    type:String,
},
itemPrice:{
    type:Number
},
itemName:{
    type:String
},
itemDescription:{
    type:String
},
isVeg:{
    type:Boolean
},
restaurantName:{
    type:String
},
})

module.exports=mongoose.model("Menu",MenuSchema,"Menu")