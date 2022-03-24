const collegeModel = require("../models/collegeModel");
const internModel = require('../models/internModel')
const validator = require("../utils/validator");

const createCollege = async (req, res) => {
  try {
    const requestBody = req.body;

    if(Object.keys(requestBody).length === 0){
        return res.status(400).json({status:false, msg:`Invalid Input. Please enter college details!`})
    }
    let { name, fullName, logoLink } = requestBody;

    if (!validator.isValidString(name)) {
      return res
        .status(400)
        .json({ status: false, msg: `College Name (abv) is required!` });
    }
    if(!requestBody.name){
       return res.status(400).json({status:false, msg:`name is mandatory!`})
    }
    if (!validator.isValidString(fullName)) {
      return res
        .status(400)
        .json({ status: false, msg: `Full College Name is required!` });
    }
    if(!requestBody.fullName){
      return res.status(400).json({status:false, msg:`Full Name is mandatory!`})
   }
    if(!/(^\w{1})|(\s+\w{1})/g.test(fullName)){
      return res.status(400).json({status:false, msg:`Invalid Full Name Format!`});
    }

    if(!requestBody.logoLink){
      return res.status(400).json({status:false, msg:`Logo Link is mandatory!`})
   }

    if(!validator.isValidString(logoLink)){
      return res.status(400).json({status:false, msg:`Logo Link is required!`});
    }

    const collegeData = await collegeModel.create(requestBody);
     res
      .status(201)
      .json({
        status: true,
        msg: `College created successfully`,
        data: collegeData,
      });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

const getCollegeDetails = async (req,res)=>{
  try {
    let collegeName = req.query.collegeName;

    if(!collegeName){
      return res.status(400).json({status:false, msg:`Query params must be present!`});
    }
    const collegeInfo = await collegeModel.findOne({name: collegeName, isDeleted:false});
    if(!collegeInfo){
      return res.status(400).json({status:false, msg:`Nothing found with given College Name. Try again using College Abbreveation.`});
    }
    const { name, fullName, logoLink} = collegeInfo;

    const collegeId = collegeInfo._id;
    const interns = await internModel.find({collegeId:collegeId, isDeleted:false}).select({_id:1,name:1,email:1,mobile:1});
    

    const data = {name, fullName, logoLink, interns};
    res.status(200).json({status:true, data:data, count:interns.length});


  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
}
    



module.exports = {
  createCollege,
  getCollegeDetails
};








