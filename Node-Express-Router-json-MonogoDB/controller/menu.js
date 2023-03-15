const Menu=require('../model/menu')


exports.getAllMenu=(req,res)=>{
    Menu.find({restaurantName:req.params.rName})
    .then(result=>{
        res.send({message:"Menu fetched successfully",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}