const mongoose=require('mongoose')

const locationSchema=mongoose.Schema({
name:{
    type:String,
},
city_id:{
    type:String
},
location_id:{
    type:String
},
country_name:{
    type:String
}
})

module.exports=mongoose.model("Location",locationSchema,"location")