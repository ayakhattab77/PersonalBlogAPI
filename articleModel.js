const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    _id:{
        type:Number,
        immutable: true
    },
    Title:{
        type:String,
        required:true,
        unique:true
    },
    Content:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("articles", articleSchema);