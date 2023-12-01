const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const mechanic = require("../models/mechanic.model")
const mechanicBook = require("../models/bookMechanic.model")
const energencyBook =  require("../models/emergencyServices.model")

function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.mechanicSignUP = async (req, res) => {
    let name = req.body.name ? req.body.name : '';
    let email = req.body.email ? req.body.email : '';
    let password = req.body.password ? req.body.password : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    let company_name = req.body.company_name ? req.body.company_name:"";
    let address = req.body.address ? req.body.address:"";
    let service_provided = req.body.service_provided ? req.body.service_provided:"";
    let confirmPassword = req.body.confirmPassword ? req.body.confirmPassword : '';
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
    try {
        if (name === null || name === '') {
            res.status(400).send({ message: "full name is required", "status": 400 });
        } else {
            if (email === null || email === '') {
                res.status(400).send({ message: "Email is required", "status": 400 });

            } else {
                if (!email.match(mailformat)) {
                    res.status(400).send({ message: "email is not in correct form", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        res.status(400).send({ message: "Password is required", "status": 400 });

                    } else {
                        if (password.length < 8) {
                            return res.status(400).send({ message: 'Password must be atleast 8 characters long', "status": 400 })
                        } else {
                            if (!password.match(passformat)) {
                                return res.status(400).send({ message: 'Password should contain atleast one number, one capital latter,one small letter and one special character', "status": 400 })
                            } else {
                                if (confirmPassword === null || confirmPassword === '') {
                                    return res.status(400).send({ message: 'confirm password is require ', "status": 400 })

                                } else {
                                    if (password !== confirmPassword) {
                                        return res.status(400).send({ message: 'password & confirm password is not match ', "status": 400 })

                                    } else {
                                        if (phone_number === null || phone_number === "") {
                                            return res
                                                .status(400)
                                                .send({
                                                    message: "Mobile Number is required",
                                                    status: 400,
                                                });
                                        } else {
                                            if (phone_number.length < 7) {
                                                return res
                                                    .status(400)
                                                    .send({
                                                        message:
                                                            "Mobile number cannot be less than 7 digits. ",
                                                        status: 400,
                                                    });
                                            } else {
                                                if (phone_number.length > 15) {
                                                    return res
                                                        .status(400)
                                                        .send({
                                                            message:
                                                                "Mobile numbers cannot be more than 15 digits long.",
                                                            status: 400,
                                                        });
                                                } else {
                                                    if (isNaN(phone_number)) {
                                                        return res
                                                            .status(400)
                                                            .send({
                                                                message:
                                                                    "Mobile number must only contains digits",
                                                                status: 400,
                                                            });
                                                    } else {


                                                        if (company_name === null || company_name === '') {
                                                            res.status(400).send({ message: "Company name is required", "status": 400 });

                                                        } else {
                                                            if (address === null || address === '') {
                                                                res.status(400).send({ message: "Address is required", "status": 400 });

                                                            }else{
                                                                if (req.files.document === null || req.files.document === "" || req.files.document === undefined ) {
                                                                    return res
                                                                      .status(400)
                                                                      .send({
                                                                        message: "Upload document is required",
                                                                        status: 400,
                                                                      });
                                                                  } else{
                                                                    if (req.files.licence === null || req.files.licence === ""|| req.files.licence === undefined ) {
                                                                        return res
                                                                          .status(400)
                                                                          .send({
                                                                            message: "Upload licence is required",
                                                                            status: 400,
                                                                          });
                                                                      }else{
                                                                        if (req.files.store_paper === null || req.files.store_paper === ""|| req.files.store_paper === undefined ) {
                                                                            return res
                                                                              .status(400)
                                                                              .send({
                                                                                message: "Upload store paper is required",
                                                                                status: 400,
                                                                              });
                                                                          }
                                                                      }
                                                                  }

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


            }
        }
        
    

        let checkEmail = await mechanic.find({ email: email }).lean()
        if (checkEmail.length > 0) {
            return res.status(409).send({ message: 'Email already exists', "status": 409 })
        }
        let checkMobileNo = await mechanic.find({ phone_number: phone_number }).lean()
        if (checkMobileNo.length > 0) {
            return res.status(409).send({ message: 'Phone Number already exists', "status": 409 })
        }


        if(req.body.latitude === undefined){
            return res
            .status(400)
            .send({
                message:
                    "First allow the location",
                status: 400,
            });  
        }


        let path1 = "";
        if (req.files.document) {
          req.files.document.forEach(function (files, index, arr) {
            path1 = path1 + files.key + ","; //for AWS
          });
    
          path1 = path1.substring(0, path1.lastIndexOf(","));
        }
        let path = "";
        if (req.files.licence) {
          req.files.licence.forEach(function (files, index, arr) {
            path = path + files.key + ","; //for AWS
          });
    
          path = path.substring(0, path.lastIndexOf(","));
        }
        let path2 = "";
        if (req.files.store_paper) {
          req.files.store_paper.forEach(function (files, index, arr) {
            path2 = path2 + files.key + ","; //for AWS
          });
    
          path2 = path2.substring(0, path2.lastIndexOf(","));
        }

        let data = await mechanic.create({
            name: name,
            email: email.toLowerCase(),
            phone_number:phone_number,
            company_name:company_name,
            document:path1,
            licence:path,
            store_paper:path2,
            address:address,
            type:"Mechanic",
            //  service_provided:serviceArray,
            "location": { 
                "type": "Point",
                "coordinates": [req.body.latitude,req.body.longitude ]
            },
            password: bcrypt.hashSync(password, 8)

        })

        console.log("data ==========>",data.location.coordinates[0])

        if(data.location.coordinates[0] === null){
            return res.status(400).send({message:"First allow the location",status:400})
        }
        return res.status(200).send({ data: data, message: "Mechanic signUp successfuly", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}


exports.addServiesProvided = async(req,res)=>{
    let id = req.params.id;
    let service_provided = req.body.service_provided ? req.body.service_provided:"";
  

    try {

        let serviceArray =[]

        req.body.service_provided.map((item) => {
         serviceArray.push(item)
        })

        let data = await mechanic.findOneAndUpdate({_id:id},{
            service_provided:serviceArray,
        },{
            new:true
        })
         return res.status(200).send({ data: data, message: "Mechanic signUp successfuly", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}
exports.mechanicLogin = async (req, res) => {
    let email = (req.body.email).toLowerCase() ? (req.body.email).toLowerCase() : '';
    let password = req.body.password ? req.body.password : '';





    //validation request
    if (email === null || email === '') {
        return res.status(400).send({ message: 'email is required', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

     //check, get and verify login data from database
     mechanic.findOne({ "email": email })
     .then(data => {
         if (data == null || data == '') {
             return res.status(404).send({
                 message: 'email does not exist',
                 "status": 404
             });
         }

            else {
                // if (data.email_verification === false) {
                //     return res.status(422).send({ message: 'Your email is not verified yet.Kindly verify your email before Login.', "status": 422 })
                // } else {
                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else{
                    if(data.verify_status === 0 ){
                        return res.status(202).send({
                            message: "Please wait for admin approval for verify your account",
                            "status": 202
                        });
                    }else{
                        if(data.verify_status === -1 ){
                            return res.status(403).send({
                                message: "Your account has been rejeted by admin",
                                "status": 403
                            });
                        }
                    

                
                
                else {
                    let token = generateToken(data._id);
                    return res.status(200).send({
                        accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200
                    });
                }
            }}

            }

        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}

exports.addMechanicLatLong = async(req,res)=>{
    let id = req.params.id;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    try {
        let data = await mechanic.findOneAndUpdate({_id:id},{
            $set:{
                "location": { 
                    "type": "Point",
                    "coordinates": [latitude,longitude ]
                }
            }
        },{new:true})

        
    return res.status(200).send({ data: data, message: "Success", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}



exports.getMechanicInfo = async(req,res) =>{
    let id = req.params.id;


  

    try {
        let data = await mechanic.findOne({_id:id});
        return res.status(200).send({ data: data, message: "Success", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}

exports.updateMechanicInfo  = async(req,res) =>{
    let id = req.params.id;
    let name = req.body.name ? req.body.name : '';

    let email = req.body.email ? req.body.email : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    let company_name = req.body.company_name ? req.body.company_name:"";
    let address = req.body.address ? req.body.address:"";

    let getData = await mechanic.findOne({_id:id})
    if(getData.email===email){

    }else{
        let checkEmail = await mechanic.findOne({email:email})

        if(checkEmail){
            return res.status(409).send({message:"Email already exist",status:409})

        }
    }
    try {
        let data = await mechanic.findOneAndUpdate({_id:id},{
            $set:{
                name: name,
                email: email.toLowerCase(),
                phone_number:phone_number,
                address:address,
                company_name:company_name,

            }
        },{new:true})

        
    return res.status(200).send({ data: data, message: "Success", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}


exports.verifyMechanicByAdmin = async(req,res) =>{
    let id= req.params.id;
    let verify_status = req.body.verify_status;
    try {
        let data = await mechanic.findOneAndUpdate({_id:id},
             {
              $set:  {verify_status:verify_status}
            },
            {new:true}
             )
             if(verify_status===1){
                return res.status(200).send({data:data,message:"Verification Successfully",status:200});

             }else if(verify_status=== -1){
                return res.status(200).send({data:data,message:"Rejected",status:200});

             }
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}



exports.getMechanicBooking = async(req,res)=>{
    
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
      
                  case 'date':
                getUserCondition = { date:userTypeSplit[1]};
                  break;
          default:
            getUserCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await mechanicBook.find(getUserCondition)
        if(data.length === 0) {
            return res.status(404).send({message:"No data found",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }   
   
   
} catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}

exports.emergencyBookingAcceptOrRejectByMechanic = async(req,res)=>{
    let id = req.params.id;
    let booking_status = req.body.booking_status;
    try {
        let data = await energencyBook.findOneAndUpdate({_id:id},{
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

exports.addAmountForEmergencyService = async(req,res)=>{
    let bookId = req.params.bookId;
    let amount = req.body.amount;

    try {
        let data = await energencyBook.findOneAndUpdate({_id:bookId},{
           $set:{
              amount:amount
           }
        },{new:true})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }
} 

exports.getAmountForEmergencyBooking = async(req,res)=>{
    let bookId = req.params.bookId;
    try {
        let data = await energencyBook.findOne({_id:bookId})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }
}



exports.addAmountForRegularService = async(req,res)=>{
    let bookId = req.params.bookId;
    let amount = req.body.amount;

    try {
        let data = await mechanicBook.findOneAndUpdate({_id:bookId},{
           $set:{
              amount:amount
           }
        },{new:true})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }
} 

exports.getAmountForRegularBooking = async(req,res)=>{
    let bookId = req.params.bookId;
    try {
        let data = await mechanicBook.findOne({_id:bookId})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})

    }
}