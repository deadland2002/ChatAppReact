const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name : {type:String , require:true},
    email : {type:String , require:true},
    password : {type:String , require:true},
    friends : [String],
    requests : [String]
}, { collection: 'user' })

const model = mongoose.model('Schema', Schema);

module.exports = model;