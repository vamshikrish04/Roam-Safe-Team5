const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const mechanic = require("../models/mechanic.model")
const user = require("../models/userSignUp.model")
const bookMechanic = require("../models/bookMechanic.model")

exports.bookMechanic = async(req,res) => {
    let userId = req.params.userId;
    let mechanicId = req.params.mechanicId;
    let issue_in_car= req.body.issue_in_car ? req.body.issue_in_car:'';
    let date = req.body.date ? req.body.date :'';
    let time = req.body.time ? req.body.time :'';
    let car_model = req.body.car_model ? req.body.car_model:'';
    try {

        let userData = await user.findOne({_id:userId})

        let mechanicData = await mechanic.findOne({_id:mechanicId})

       

        let data = await bookMechanic.create({
            userId:userId,
            mechanicId:mechanicId,
            date:date,
            time:time,
            car_model:car_model,
            issue_in_car:issue_in_car,

            userName:userData.first_name + ' ' + userData.last_name,
             userMobileNo:userData.phone_number,
            mechaicMobileNo:mechanicData.phone_number,
            mechanicName:mechanicData.name,

        })
        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }

}




exports.bookingAcceptOrRejectByMachenic = async(req,res)=>{
    let id = req.params.id;
    let booking_status = req.body.booking_status;
    try {
        let data = await bookMechanic.findOneAndUpdate({_id:id},{
            $set:{
                booking_status:booking_status
                
            }
        },{new:true});
        if(booking_status === 1){
            return res.status(200).send({data:data,message:"Booking Accepted",status:200})
        }else{
            if(booking_status === -1){
                return res.status(200).send({data:data,message:"Booking Rejected",status:200})
            }else{
                if(booking_status === 2) {
                    return res.status(200).send({data:data,message:"Booking completed",status:200})

                }else{
                    if(booking_status === 3) {
                        return res.status(200).send({data:data,message:"Provider on the way",status:200})
    
                    }else{
                        if(booking_status === 4) {
                            return res.status(200).send({data:data,message:"Reached on location",status:200})
        
                        }
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }

}