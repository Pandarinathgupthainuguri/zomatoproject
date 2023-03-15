const Mealtypes=require('../model/mealtype')


exports.getAllMealtypes=(req,res)=>{
    Mealtypes.find()
    .then(result=>{
        res.send({message:"Mealtypes  fetched successfully",
    data:result
    })
    
})
    .catch(error=>{
        res.send({message:"Db error",
        error:error
    })
    })
}