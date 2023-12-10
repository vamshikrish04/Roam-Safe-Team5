const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const towing = require("../models/towing.model")
const towingBook = require("../models/bookTowing.model")
const user = require("../models/userSignUp.model")




exports.getNearestTowingPrivider = async(req,res) =>{
    // let longitude = req.body.longitude;
    // let latitude = req.body.latitude;
    
        const {  latitude, longitude, maxDistance } = req.params;
    
        if (!latitude || !longitude || !maxDistance) {
            return res.status(400).json({ error: 'Invalid parameters' });
        }
    
        try {

            console.log(latitude, longitude, maxDistance)
            const providers = await towing.find({
                location: {
                    $nearSphere: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [parseFloat(latitude), parseFloat(longitude)],
                        },
                        $maxDistance: parseFloat(maxDistance) * 1000, // Convert km to meters
                    },
                }
            });

            console.log(providers)
             
            if(providers.length === 0) {
                return res.status(404).send({message:"No data found",status:404});
            }
            res.json({providers,status:200});







        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    
    
    
  
    
    
}

exports.bookingTowingProvider = async(req,res)=>{
    let userId = req.params.userId;
    let towingId = req.params.towingId;
    let userName = req.body.userName;
    let towingProviderName = req.body.towingProviderName;
    let userMobileNo =req.body.userMobileNo;
    let towingProviderMobileNo = req.body.towingProviderMobileNo;
    let towing_needed = req.body.towing_needed;
    let userLocation = req.body.userLocation;
    let towingProviderLocation = req.body.towingProviderLocation;
    let description = req.body.description;
    let car_model = req.body.car_model;

    try {

        let userData = await user.findOne({_id:userId})

         let towingData = await towing.findOne({_id:towingId})

         const userLat = userData.location.coordinates[0];
         const userLong = userData.location.coordinates[1];
         const towingLat = towingData.location.coordinates[0];
         const towingLong = towingData.location.coordinates[1];
 
          console.log(userLat,userLong,towingLat,towingLong)

         function haversine(userLat, userLong, towingLat, towingLong) {
             // Radius of the Earth in kilometers
             const R = 3958.8;
         
             // Convert latitude and longitude from degrees to radians
             const lat1Rad = toRadians(userLat);
             const lon1Rad = toRadians(userLong);
             const lat2Rad = toRadians(towingLat);
             const lon2Rad = toRadians(towingLong);
         
             // Differences in coordinates
             const dLat = lat2Rad - lat1Rad;
             const dLon = lon2Rad - lon1Rad;
         
             // Haversine formula
             const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                       Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                       Math.sin(dLon / 2) * Math.sin(dLon / 2);
             const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
         
             // Distance in kilometers
             const distance = R * c;
        
             return distance;
         }
         
         function toRadians(degrees) {
             return degrees * Math.PI / 180;
         }
         
         // // Example usage
         // const lat1 = 37.7749; // Latitude of point 1
         // const lon1 = -122.4194; // Longitude of point 1
         // const lat2 = 34.0522; // Latitude of point 2
         // const lon2 = -118.2437; // Longitude of point 2
         
          let distance = haversine(userLat,userLong,towingLat,towingLong);
      console.log(`Distance between the two points: ${distance} km`);
         
    distance =  Math.floor(distance)
    console.log("distance =======>",distance)
        let data = await towingBook.create({
            userId:userId,
            towingId:towingId,
            towing_needed:towing_needed,
            description:description,
            distance:distance,
            car_model:car_model,
            userName:userData.first_name + " " + userData.last_name,
            towingProviderName:towingData.name,
            userMobileNo:userData.phone_number,
            towingProviderMobileNo:towingData.phone_number,
            userLocation:userData.location,
            towingProviderLocation:towingData.location
            
             
        })

        return res.status(200).send({data:data,message:"Success",status:200});

    
} catch (error) {
return res.status(500).send({ message: error.message, "status": 500 })

}


}

exports.getAmountBasedOnDistance = async(req,res)=>{
    let bookId = req.params.bookId;
    let perkm = req.body.perkm;

    try {
        let bookingData = await towingBook.findOne({_id:bookId})

        let amount = (bookingData.distance)*perkm;

        let data = await towingBook.findOneAndUpdate({_id:bookId},{
            $set:{
                amount:amount
            }
        },{
            new:true
        })


        return res.status(200).send({data:data,message:"Success",status:200});

    
    } catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })
    
    }
}

exports.GetBookingAmount = async(req,res)=>{
    let bookId = req.params.bookId;
  

    try {
        let data = await towingBook.findOne({_id:bookId},{
            amount:1
        })
          return res.status(200).send({data:data,message:"Success",status:200});

    } catch (error) {
    return res.status(500).send({ message: error.message, "status": 500 })
    
    }
}