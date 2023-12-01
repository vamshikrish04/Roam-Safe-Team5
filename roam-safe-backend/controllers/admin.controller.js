const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const admin = require("../models/admin.model")

const user = require("../models/userSignUp.model")
const mechanic = require("../models/mechanic.model")
const booking = require("../models/bookMechanic.model")
const emergencyBooking = require("../models/emergencyServices.model")
const towing = require("../models/towing.model")
const contact = require("../models/contact.model")


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.adminSignUp = async (req, res) => {
 
    let adminEmail = req.body.adminEmail ? req.body.adminEmail : '';

    let password = req.body.password ? req.body.password : '';
   
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    try {
      
            if (adminEmail === null || adminEmail === '') {
                res.status(400).send({ message: "adminEmail is required", "status": 400 });

            } else {
                if (!adminEmail.match(mailformat)) {
                    res.status(400).send({ message: "adminEmail is not in correct form", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        res.status(400).send({ message: "adminEmail is required", "status": 400 });

                    }

                }
            }
        

        
    

        let data = await admin.create({ 
        
            adminEmail:adminEmail.toLowerCase(),
          
            password:bcrypt.hashSync(password, 8)

        })
      return  res.status(200).send({data:data,message:"Admin signUp successfuly", "status":200})
    } catch (error) {
       return res.status(500).send({message:error.message, "status":500})
    }
}

exports.adminLogin = async (req, res) => {
    let adminEmail = (req.body.adminEmail).toLowerCase() ? (req.body.adminEmail).toLowerCase() : '';
    let password = req.body.password ? req.body.password : '';

    //validation request
    if (adminEmail === null || adminEmail === '') {
        return res.status(400).send({ message: 'Email is required', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

    //check, get and verify login data from database
    admin.findOne({ "adminEmail": adminEmail })
        .then(data => {
            if (data == null || data == '') {
                return res.status(404).send({
                    message: 'email does not exist',
                    "status": 404
                });
            }

            else {

                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else {
                    let token = generateToken(data._id);
                  
                        
                    return res.status(200).send({ accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200})

                }
            }



        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}


exports.getAllUser = async(req,res) => {
    
    try {
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getUserCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getUserCondition = {}; 
              break;
          case 'id':
            getUserCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getUserCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await user.find(getUserCondition)
        if(data.length === 0) {
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }   
   
   
} catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}

exports.getAllMechanic = async(req,res) => {
    
    try {
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getMechanicCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getMechanicCondition = {}; 
              break;
          case 'id':
            getMechanicCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getMechanicCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await mechanic.find(getMechanicCondition)
        if(data.length === 0) {
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }   
   
   
} catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}

exports.getAllEmergencyBooking = async(req,res) =>{
    try {
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getUserCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getUserCondition = {}; 
              break;
          case 'mechanicId':
            getUserCondition = { mechanicId:userTypeSplit[1]};
              break;

              case 'userId':
                getUserCondition = { userId:userTypeSplit[1]};
                  break;
      
          default:
            getUserCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await emergencyBooking.find(getUserCondition)
       return res.status(200).json({data:data,message:"Success",status:200});

    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}


exports.verifyTowingProvider = async(req,res)=>{
    let towingId  = req.params.towingId;
let verify_status = req.body.verify_status;

    try {
        let data = await towing.findOneAndUpdate({_id:towingId},{
            $set:{
                verify_status:verify_status
            }
        },{new:true})

        if(verify_status===1){
            return res.status(200).send({data:data,message:"Verification Successfully",status:200});

         }else if(verify_status=== -1){
            return res.status(200).send({data:data,message:"Rejected",status:200});

         }
        } catch (error) {
        return res.status(500).send({message:error.message, status:500})
    }
}



exports.getAllTowingProvider = async(req,res) => {
    
    try {
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getMechanicCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getMechanicCondition = {}; 
              break;
          case 'id':
            getMechanicCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getMechanicCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await towing.find(getMechanicCondition)
        if(data.length === 0) {
            return res.status(404).send({data:data,message:"No data found",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }   
   
   
} catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}


exports.getContacts = async(req,res)=>{
    try {

        let data  = await contact.find({})
        console.log("data====>",data)

        if(data.length === 0){
            return res.status(404).send({messag:"No data found",status:404})
        }
      
            return res.status(200).send({data:data,message:"Success",status:200})

        
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}


exports.deleteContact = async(req,res)=>{
    let id = req.params.id;

    try {
        let data = await contact.findOneAndDelete({_id:id})

        return res.status(200).send({message:"Successfully deleted",status:200
        })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}