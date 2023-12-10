const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const userSignup = require("../models/userSignUp.model")
const mechanic = require("../models/mechanic.model")
const emergencyService = require("../models/emergencyServices.model")
const contact = require("../models/contact.model")
const card = require("../models/pay.model")
const bookMechanic = require("../models/bookMechanic.model")
const towing = require("../models/towing.model")
const towingBooking = require("../models/bookTowing.model")


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}

exports.userSignUP = async (req, res) => {
    let first_name = req.body.first_name ? req.body.first_name : '';
    let last_name = req.body.last_name ? req.body.last_name:"";
    let userEmail = req.body.userEmail ? req.body.userEmail : '';
    let password = req.body.password ? req.body.password : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
    try {
        if (first_name === null || first_name === '') {
           return res.status(400).send({ message: "first name is required", "status": 400 });
        }else{
            if (last_name === null || last_name === '') {
                return res.status(400).send({ message: "Last name is required", "status": 400 });
            } 
        
         else {
            if (userEmail === null || userEmail === '') {
                return res.status(400).send({ message: "userEmail is required", "status": 400 });

            } else {
                if (!userEmail.match(mailformat)) {
                    return res.status(400).send({ message: "userEmail is not in correct form", "status": 400 });

                } else {
                    if (password === null || password === '') {
                        return res.status(400).send({ message: "userEmail is required", "status": 400 });

                    } else {
                        if (password.length < 8) {
                            return res.status(400).send({ message: 'Password must be atleast 8 characters long', "status": 400 })
                        } else {
                            if (!password.match(passformat)) {
                                return res.status(400).send({ message: 'Password should contain atleast one number, one capital latter,one small letter and one special character', "status": 400 })
                            }  else {
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

               
        


        let checkuserEmail = await userSignup.find({ userEmail: userEmail }).lean()
        if (checkuserEmail.length > 0) {
            return res.status(409).send({ message: 'userEmail already exists', "status": 409 })
        }

        
        let checkMobileNo = await userSignup.find({  phone_number:phone_number, }).lean()
        if (checkMobileNo.length > 0) {
            return res.status(409).send({ message: 'Mobile Number already exists', "status": 409 })
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
        
        let data = await userSignup.create({
            first_name: first_name,
            last_name:last_name,
            userEmail: userEmail.toLowerCase(),
            type:"User",
            phone_number:phone_number,
            "location": { 
                "type": "Point",
                "coordinates": [req.body.latitude,req.body.longitude ]
            },
            password: bcrypt.hashSync(password, 8)

        })
        return res.status(200).send({ data: data, message: "User signUp successfuly", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}


exports.UserLogin = async (req, res) => {
    let userEmail = (req.body.userEmail).toLowerCase() ? (req.body.userEmail).toLowerCase() : '';
    let password = req.body.password ? req.body.password : '';





    //validation request
    if (userEmail === null || userEmail === '') {
        return res.status(400).send({ message: 'userEmail is required', "status": 400 })
    } else {
        if (password === null || password === '') {
            return res.status(400).send({ message: 'Password is required', "status": 400 })
        }
    }

     //check, get and verify login data from database
     userSignup.findOne({ "userEmail": userEmail })
     .then(data => {
         if (data == null || data == '') {
             return res.status(404).send({
                 message: 'email does not exist',
                 "status": 404
             });
         }

            else {
                // if (data.userEmail_verification === false) {
                //     return res.status(422).send({ message: 'Your userEmail is not verified yet.Kindly verify your userEmail before Login.', "status": 422 })
                // } else {
                let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
                if (!passwordIsValid) {
                    return res.status(401).send({
                        message: "Invalid Password!",
                        "status": 401
                    });
                } else {
                    let token = generateToken(data._id);
                    return res.status(200).send({
                        accessToken: token,
                        data: data,
                        message: "Success",
                        "status": 200
                    });
                }
            }

            // }

        })
        .catch(err => {
            res.status(400).send({
                message: err.message,
                "status": 400
            });
        });
}


exports.getUserInfo = async(req,res) =>{
    let id = req.params.id;

    try {
        let data = await userSignup.findOne({_id:id});
        return res.status(200).send({ data: data, message: "Success", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}

exports.updateUserInfo  = async(req,res) =>{
    let id = req.params.id;
    let first_name = req.body.first_name ? req.body.first_name : '';
    let last_name = req.body.last_name ? req.body.last_name:"";
        let userEmail = req.body.userEmail ? req.body.userEmail : '';
    let phone_number = req.body.phone_number ? req.body.phone_number : '';
    let address = req.body.address ? req.body.address : '';

    try {
        let data = await userSignup.findOneAndUpdate({_id:id},{
            $set:{
                first_name:first_name,
                last_name:last_name,
                userEmail: userEmail.toLowerCase(),
                phone_number:phone_number,
                address:address,
            }
        },{new:true})

        
    return res.status(200).send({ data: data, message: "Success", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}

exports.addUserLatLong = async(req,res)=>{
    let id = req.params.id;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    try {
        let data = await userSignup.findOneAndUpdate({_id:id},{
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


exports.nearestMechanic = async(req,res) =>{
    // let longitude = req.body.longitude;
    // let latitude = req.body.latitude;
    
        const {  latitude, longitude, maxDistance } = req.params;
    
        if (!latitude || !longitude || !maxDistance) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
    
        try {
            const providers = await mechanic.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(latitude), parseFloat(longitude)],
                        },
                        $maxDistance: parseFloat(maxDistance) * 1000, // Convert km to meters
                    },
                },verify_status:1
            });
             
            if(providers.length === 0) {
                return res.status(404).send({message:"No data found",status:404});
            }
            res.json(providers);







        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    
    
  
    
    
}

exports.bookMechanicForEmergencyService = async(req,res)=>{
   let userId = req.params.userId;
   let mechanicId = req.params.mechanicId;
   let car_model = req.body.car_model;
   let description = req.body.description;
   let service_needed= req.body.service_needed;

   try {

    let userData = await userSignup.findOne({_id:userId})

    let mechanicData = await mechanic.findOne({_id:mechanicId})

    let data = await emergencyService.create({
        userId:userId,
        mechanicId:mechanicId,
        car_model:car_model,
        description:description,
        service_needed:service_needed,
        userName:userData.first_name + ' ' + userData.last_name,
        userMobileNo:userData.phone_number,
       mechaicMobileNo:mechanicData.phone_number,
       mechanicName:mechanicData.name,
       userLocation:userData.location,
       mechanicLocation:mechanicData.location
    })
    return res.status(200).send({data:data,message:"Success",status:200});
   } catch (error) {
   return res.status(500).json({ error: error.message ,status:500});

   }
 
}


exports.addContactForm = async(req,res)=>{
    let name = req.body.name ? req.body.name:'';
    let email = req.body.email ? req.body.email:'';
    let mobile_no = req.body.mobile_no ? req.body.mobile_no:'';
    let message = req.body.message ? req.body.message:'';

    try {
        let data = await contact.create({
            name:name,
            email:email,
            mobile_no:mobile_no,
            message:message
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).json({ error: error.message ,status:500});

    }
}

exports.bookingPaymentforMechanic = async(req,res)=>{
    let bookId= req.params.bookId;
    let userId = req.params.userId;
    let mechanicId = req.params.mechanicId;
    let card_number = req.body.card_number;
    let cvv = req.body.cvv;
    let expire_date = req.body.expire_date;
    let amount = req.body.amount;

    try {


     
         let bookData = await bookMechanic.findOneAndUpdate({
            _id:bookId
         },{
            $set:{
                booking_status:5
            }
         },{new:true})

        let userData = await userSignup.findOne({_id:userId})

        let mechanicData = await mechanic.findOne({_id:mechanicId})

       let cardNumber =  card_number.replace(/\s/g, '');
 
        if(!cardNumber || !cvv || !expire_date || !amount ){
            return res.status(400).send({message:"All fields are require",status:400})
        }else{
            if(cardNumber.length !== 16){
                return res.status(400).send({message:"Card number should have 16 digits",status:400})

            }else{
                if(cvv.length !== 3){
                    return res.status(400).send({message:"Cvv number should have 3 digits",status:400})
 
                }
                  
                
            }
        }

     
        var d = new Date();
        var year = d.getFullYear();
        var currentYear = year.toString().substr(-2);
        var currentMonth = d.getMonth() + 1;
        //  console.log(currentMonth , "   ",currentYear)
        var datePart = expire_date.split("/")
        var month = datePart[0];
        var year = datePart[1];
        // console.log(month,"   ", year)

        if((currentMonth > month && currentYear > year) || (currentMonth < month && currentYear > year) || (currentYear > year))
        {
                 return res.status(498).send({message:"Expiry date is less than current date.",status:498});
         }
      
        let data = await card.create({
            userId:userId,
            mechanicId:mechanicId,
            card_number:cardNumber,
            userName:userData.first_name + ' ' + userData.last_name,
            mechanicName:mechanicData.name,
            cvv:cvv,
            expire_date:expire_date,
            amount:amount,
        })

        return res.status(200).send({data:data,message:"Payment Done",status:200})
    } catch (error) {
        return res.status(500).json({ error: error.message ,status:500});

    }
}



exports.emergencyBookPaymentforMechanic = async(req,res)=>{
    let bookId= req.params.bookId;
    let userId = req.params.userId;
    let mechanicId = req.params.mechanicId;
    let card_number = req.body.card_number;
    let cvv = req.body.cvv;
    let expire_date = req.body.expire_date;
    let amount = req.body.amount;

    try {


     
         let bookData = await emergencyService.findOneAndUpdate({
            _id:bookId
         },{
            $set:{
                booking_status:5
            }
         },{new:true})

        let userData = await userSignup.findOne({_id:userId})

        let mechanicData = await mechanic.findOne({_id:mechanicId})

       let cardNumber =  card_number.replace(/\s/g, '');
 
        if(!cardNumber || !cvv || !expire_date || !amount ){
            return res.status(400).send({message:"All fields are require",status:400})
        }else{
            if(cardNumber.length !== 16){
                return res.status(400).send({message:"Card number should have 16 digits",status:400})

            }else{
                if(cvv.length !== 3){
                    return res.status(400).send({message:"Cvv number should have 3 digits",status:400})
 
                }
                  
                
            }
        }

     
        var d = new Date();
        var year = d.getFullYear();
        var currentYear = year.toString().substr(-2);
        var currentMonth = d.getMonth() + 1;
        //  console.log(currentMonth , "   ",currentYear)
        var datePart = expire_date.split("/")
        var month = datePart[0];
        var year = datePart[1];
        // console.log(month,"   ", year)

        if((currentMonth > month && currentYear > year) || (currentMonth < month && currentYear > year) || (currentYear > year))
        {
                 return res.status(498).send({message:"Expiry date is less than current date.",status:498});
         }
      
        let data = await card.create({
            userId:userId,
            mechanicId:mechanicId,
            card_number:cardNumber,
            userName:userData.first_name + ' ' + userData.last_name,
            mechanicName:mechanicData.name,
            cvv:cvv,
            expire_date:expire_date,
            amount:amount,
        })

        return res.status(200).send({data:data,message:"Payment Done",status:200})
    } catch (error) {
        return res.status(500).json({ error: error.message ,status:500});

    }
}



exports.PaymentforTowingProvider = async(req,res)=>{
    let bookId= req.params.bookId;
    let userId = req.params.userId;
    let towingId = req.params.towingId;
    let card_number = req.body.card_number;
    let cvv = req.body.cvv;
    let expire_date = req.body.expire_date;
    let amount = req.body.amount;

    try {

           if(amount === 0){
            return res.status(400).send({message:"Amount should be more than 0",status:400})
           }
     
         let bookData = await towingBooking.findOneAndUpdate({
            _id:bookId
         },{
            $set:{
                booking_status:5
            }
         },{new:true})

        let userData = await userSignup.findOne({_id:userId})

        let towingData = await towing.findOne({_id:towingId})

       let cardNumber =  card_number.replace(/\s/g, '');

       
 
        if(!cardNumber || !cvv || !expire_date || !amount ){
            return res.status(400).send({message:"All fields are require",status:400})
        }else{
            if(cardNumber.length !== 16){
                return res.status(400).send({message:"Card number should have 16 digits",status:400})

            }else{
                if(cvv.length !== 3){
                    return res.status(400).send({message:"Cvv number should have 3 digits",status:400})
 
                }
                  
                
            }
        }

     
        var d = new Date();
        var year = d.getFullYear();
        var currentYear = year.toString().substr(-2);
        var currentMonth = d.getMonth() + 1;
        //  console.log(currentMonth , "   ",currentYear)
        var datePart = expire_date.split("/")
        var month = datePart[0];
        var year = datePart[1];
        // console.log(month,"   ", year)

        if((currentMonth > month && currentYear > year) || (currentMonth < month && currentYear > year) || (currentYear > year))
        {
                 return res.status(498).send({message:"Expiry date is less than current date.",status:498});
         }
      
        let data = await card.create({
            userId:userId,
            towingId:towingId,
            card_number:cardNumber,
            userName:userData.first_name + ' ' + userData.last_name,
            towingName:towingData.name,
            cvv:cvv,
            expire_date:expire_date,
            amount:amount,
        })

        return res.status(200).send({data:data,message:"Payment Done",status:200})
    } catch (error) {
        return res.status(500).json({ error: error.message ,status:500});

    }
}

exports.getPaymentHistory = async(req,res)=>{
    try{
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
              case 'towingId':
                getUserCondition = { towingId:userTypeSplit[1]};
                  break;
  
      default:
        getUserCondition = { message:"Please provide valid type"};
          break;
    }
    let data = await card.find(getUserCondition,{
        cvv:0,
        card_number:0,
        expire_date:0
    })
   return res.status(200).json({data:data,message:"Success",status:200});

} catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })

}
}