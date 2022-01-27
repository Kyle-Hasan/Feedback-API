const { request } = require('express')
const express = require('express')
const router = express.Router()
//getting the model that gives us a schema to interact directly with the database
const feedback = require('../models/feedbackModel')

//getting all
router.get('/', async(req,res,next)=>{
    try {
        const feedbackitems = await feedback.find()
        res.status(201).json(feedbackitems)

    }
    catch(err){
        res.status(500).json({message : err.message})
        console.log(err)
    }
    next()
})

//getting one(second arg defined middleware argument that is automatically called with the next arg being the next argument)
router.get('/:id',getFeedback,(req,res,next)=> {
    res.send(res.feedbackItem)
    next()

})
//creating one
router.post('/', async(req,res)=>{
    const feedbackItem = new feedback({
        
        text: req.body.text,
        rating: req.body.rating
})
try {
    const newFeedback = await feedbackItem.save(feedbackItem)
    res.status(201).json(newFeedback)
}
catch(error){
    res.status(400).json({message: error.message})
}

})

//Updating One
router.put('/:id', getFeedback, async (req,res)=>{
    try{
        console.log(`request is ${req}`)
        console.log("request.body is " + req.body.text + " res rating is  " + req.body.rating  )
        res.feedbackItem.text = req.body.text
        res.feedbackItem.rating = req.body.rating

        const updated = await res.feedbackItem.save()
        res.json(updated)
        

    }
    catch(error){
        res.status(500).json({message : "error patching"})
    }
})

//deleting one

router.delete('/:id',getFeedback,async (req,res)=>{
    try{
        await res.feedbackItem.remove()
        res.json({message: "feedback deleted"})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

})

async function getFeedback(req, res, next){
    let feedbackItem
    try{
        feedbackItem = await feedback.findById(req.params.id)
       if(!feedbackItem){
           return res.status(404).json({message : "feedback item not found"})
       }

    } catch(error){
        return res.status(500).json({message:error.message})

    }
    res.feedbackItem = feedbackItem
    next()

}

async function akame(req,res,next){
    next();
}
module.exports = router