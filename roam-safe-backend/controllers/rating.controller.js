const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const ratingRev = require("../models/rating.model")

const user = require("../models/userSignUp.model")

const mechanic = require("../models/mechanic.model")

const towing = require("../models/towing.model")

exports.addReviewRating = async(req,res) => {
    let userId  = req.params.userId;
    let mechanicId = req.params.mechanicId;
    let rating = req.body.rating;
    let review = req.body.review;

    try {

      let userData = await user.findOne({_id:userId})

      let mechanicData = await mechanic.findOne({_id:mechanicId})
            

        let data = await ratingRev.create({
            userId:userId,
            mechanicId:mechanicId,
            userName:userData.first_name + " "+ userData.last_name,
            mechanicName:mechanicData.name,
            rating: rating,
            review:review
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }
}

    exports.getRatingData = async(req,res) => {

        try {
            let userAccording = req.params.allActive;
            console.log(userAccording);
            let userTypeSplit = userAccording.split("_");
            let getReviewCondition = '';
            switch (userTypeSplit[0]) {
              case 'All':
                getReviewCondition = {}; 
                  break;
              case 'mechanicId':
                getReviewCondition = { mechanicId:userTypeSplit[1]};
                  break;
          
                  case 'rating':
                    getReviewCondition = {userId:userTypeSplit[1], mechanicId:userTypeSplit[2]};
                      break;
              default:
                getReviewCondition = { message:"Please provide valid type"};
                  break;
            }

             
            let data = await ratingRev.find(getReviewCondition)
            if(data.length === 0) {
                return res.status(404).send({data:data,message:"No data fount",status: 404});
            }else{
              data.reverse();
            return res.status(200).send({data:data,message:"Success",status: 200});
            }   
       
       
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
    }


exports.getAvgRatingOfMechanic = async(req,res)=>{
  let mechanicId = req.params.mechanicId;
  try {
    let data = await ratingRev.find({ mechanicId:mechanicId})
    if(data.length === 0){
        return res.status(404).send({data:data,message:"No data found",status: 404});
    }
    let rating = 0;

    data.map((item) => {
        rating = item.rating + rating;
    })
     
    let avgRating = rating/data.length;
    return res.status(200).json({data : avgRating,message:"Success",status:200});

  } catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

  }

}


exports.addReviewRatingForTowing = async(req,res) => {
  let userId  = req.params.userId;
  let towingId = req.params.towingId;
  
  let rating = req.body.rating;
  let review = req.body.review;

  try {

    let userData = await user.findOne({_id:userId})

    let towingData = await towing.findOne({_id:towingId})
          

      let data = await ratingRev.create({
          userId:userId,
          towingId:towingId,
          userName:userData.first_name + " "+ userData.last_name,
          towingName:towingData.name,
          rating: rating,
          review:review
      })

      return res.status(200).send({data:data,message:"Success",status:200})
  } catch (error) {
      return res.status(500).send({message:error.message,status:500})

  }
}

  exports.getTowingRatingData = async(req,res) => {

      try {
          let userAccording = req.params.allActive;
          console.log(userAccording);
          let userTypeSplit = userAccording.split("_");
          let getReviewCondition = '';
          switch (userTypeSplit[0]) {
            case 'All':
              getReviewCondition = {}; 
                break;
            case 'towingId':
              getReviewCondition = { towingId:userTypeSplit[1]};
                break;
                case 'rating':
                  getReviewCondition = {userId:userTypeSplit[1], towingId:userTypeSplit[2]};
                    break;
        
            default:
              getReviewCondition = { message:"Please provide valid type"};
                break;
          }
          let data = await ratingRev.find(getReviewCondition)
          if(data.length === 0) {
              return res.status(404).send({data:data,message:"No data fount",status: 404});
          }else{
            data.reverse()
          return res.status(200).send({data:data,message:"Success",status: 200});
          }   
     
     
  } catch (error) {
      return res.status(500).send({ message: error.message, "status": 500 })

  }
  }


exports.getAvgRatingOfTowing = async(req,res)=>{
let towingId = req.params.towingId;
try {
  let data = await ratingRev.find({ towingId:towingId})
  if(data.length === 0){
      return res.status(404).send({data:data,message:"No data found",status: 404});
  }
  let rating = 0;

  data.map((item) => {
      rating = item.rating + rating;
  })
   
  let avgRating = rating/data.length;
  return res.status(200).json({data : avgRating,message:"Success",status:200});

} catch (error) {
  return res.status(500).send({ message: error.message, "status": 500 })

}

}


