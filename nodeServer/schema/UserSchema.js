const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name : {type:String , require:true},
    email : {type:String , require:true},
    password : {type:String , require:true},
    friends : [{name:String,email:String,room_id:String}],
    requests : [{name:String,email:String}]
}, { collection: 'user' })

const model = mongoose.model('UserSchema', Schema);

module.exports = model;