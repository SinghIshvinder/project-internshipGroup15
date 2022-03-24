const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: {type:String, unique:true, required:true, trim:true, lowercase:true},
    fullName : {type:String, unique:true, required:true, trim:true, match:/(^\w{1})|(\s+\w{1})/g},
    logoLink : {type:String, required:true},
    isDeleted : {type:Boolean, default:false}
},{timestamps: true})


module.exports = mongoose.model('College',collegeSchema);