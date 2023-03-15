//const restaurants=require('../model/restaurant.json')
const Restaurants=require('../model/restaurant')

exports.getAllRestaurants=(req,res)=>{
    Restaurants.find()
    .then(result=>{
        res.send({message:"restaurants GET",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}

exports.addRestaurant=(req,res)=>{
    // restaurants.push({name:"ABC",city:"Jaipur"})
    // console.log(req.body)
    Restaurants.push(req.body)
    res.send({message:"post",
    data:Restaurants
})
}

exports.getRestaurantsByCity=(req,res)=>{
    let filter={
        city:req.params.cityID
    }
    Restaurants.find(filter)
    .then(result=>{
        res.send({message:"restaurants GET",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}

exports.editRestaurant=(req,res)=>{
    // console.log(req.body)
    let index=restaurants.findIndex((item)=>item.name== req.body.name)
    console.log(index)
    if(index!=-1)
     restaurants.splice(index,1,req.body)
    res.send({message:"edited successfully",
    data:restaurants})
}

exports.deleteRestaurant=(req,res)=>{
    let index=Restaurants.findIndex((item)=>item.name== req.body.name)
    if(index!=-1)
    restaurants.splice(index,1)
    res.send({
        message:"deleted",
        data:restaurants
    })
}
exports.getRestaurantByFilter=(req,res)=>{
    console.log("hitted")
    var filter={}
    //To filter by city
    if(req.body.city_id){
        filter.city=req.body.city_id;
    }
    if(req.body.cuisine && req.body.cuisine.length>0){
        console.log("hello")
        filter['Cuisine.name']={$in :req.body.cuisine};
    }
        if(req.body.lcost && req.body.hcost){
            filter.cost={
                $lt:req.body.hcost,
                $gt:req.body.lcost
            }
        } 
        console.log(filter)
        console.log(req.body.cuisine)

    Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({cost:req.body.sort})
    //For pagination:   limit(2).skip(2*(req.params.pageNo-1))
    //For sorting:   sort({cost:req.body.sort})  ,  input: body: {"cost":1/-1}

    .then(result=>{
        res.send({message:"restaurants GET",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}
exports.getRestaurantDetailsByName=(req,res)=>{
    Restaurants.findOne({name:req.params.rName})
    .then(result=>{
        res.send({message:"restaurants GET",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}