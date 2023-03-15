const Location=require('../model/location')


exports.getAllLocation=(req,res)=>{
    Location.find()
    .then(result=>{
        res.send({message:"location fetched successfully",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}