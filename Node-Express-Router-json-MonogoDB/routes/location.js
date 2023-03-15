const express=require('express')
const locationController=require('../controller/location')

const router=express.Router()
router.get('',locationController.getAllLocation)
module.exports=router;