const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
  
    text : {
        type : String,
        required: true
    },
    rating : {
        type: Number,
        required: true
    }
})
//model allow you to interact directly with the database using the schema(first arg is name of the collection)
module.exports = mongoose.model('feedback',feedbackSchema)