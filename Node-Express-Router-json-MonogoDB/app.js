//importing express
const bodyParser = require('body-parser')
const express=require('express')
const restaurantsRotes=require('./routes/restaurants')
const locationRotes=require('./routes/location')
const mealtypeRoutes=require('./routes/mealtype')
const menuRoutes=require('./routes/menu')
const mongoose=require('mongoose')
const cors=require('cors')

//create constant
const PORT=9091
const MONGO_URI="mongodb+srv://akshay1997:akshay1234@cluster0.utmdabd.mongodb.net/zomato"
// const MONGO_URI="mongodb://127.0.0.1:27017/zomato"
//OR
// const MONGO_URI="mongodb://localhost:27017/zomato"

//connect to DB
mongoose.connect(MONGO_URI,()=>{
    console.log("Mongodb connected")
})
//createserver
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use('/restaurants',restaurantsRotes)
app.use('/location',locationRotes)
app.use('/mealtype',mealtypeRoutes)
app.use('/menu',menuRoutes)


app.listen(PORT,()=>{
    console.log(`app is started on PORT ${PORT}`)
})