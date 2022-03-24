const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
const validator = require('../utils/validator');

const createIntern = async (req, res)=>{
    try {
        let requestBody = req.body;
        if(Object.keys(requestBody).length === 0){
            return res.status(400).json({status:false, msg:`Invalid Input. Please enter intern details!`})
        }
        let {name, email, mobile, collegeId } = requestBody;

        if(!requestBody.name){
            return res.status(400).json({status:false, msg:`name is mandatory!`})
         }
        if(!validator.isValidString(name)){
            return res.status(400).json({status:false, msg:`name is mandatory field!`})
        }
        if(!requestBody.email){
            return res.status(400).json({status:false, msg:`email is mandatory!`})
         }
        if(!validator.isValidString(email)){
            return res.status(400).json({status:false, msg:`email is mandatory field!`})
        }
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            return res.status(400).json({status:false, msg:`Invalid email address!`})
        }
        if(!requestBody.mobile){
            return res.status(400).json({status:false, msg:`mobile is mandatory!`})
         }
        if(validator.isValid(mobile)){
            return res.status(400).json({status:false, msg:`mobile number is mandatory field!`})
        }
        if(!/^[6-9]\d{9}$/.test(mobile)){
            return res.status(400).json({status:false, msg:`Invalid Mobile Number!`});
        }
        if(!requestBody.collegeId){
            return res.status(400).json({status:false, msg:`collegeID is mandatory!`})
         }
        if(!validator.isValidString(collegeId)){
            return res.status(400).json({status:false, msg:`college ID is mandatory field!`})
        }
        if(!validator.isValidObjectId(collegeId)){
            return res.status(400).json({status:false, msg:`${collegeId} is not valid College ID!`})
        }
        const findCollege = await collegeModel.findById(collegeId);
        if(!findCollege){
            return res.status(404).json({status:false, msg:`${collegeId} is not present in DB!`})
        }

        const internData = await internModel.create(requestBody);
        res.status(201).json({status:true, msg:'Intern Profile Successfully created',data:internData})
        
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
    }

}






module.exports = {
    createIntern
}