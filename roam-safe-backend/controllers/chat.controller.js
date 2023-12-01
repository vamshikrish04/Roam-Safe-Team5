const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const chat = require("../models/chat.model")
const towingChat = require("../models/towingchat.model")
const admin = require("../models/adminChat.model")
const user = require("../models/userSignUp.model")
const mechanic = require("../models/mechanic.model")
const towing = require("../models/towing.model")

exports.sendText = async(req,res)=>{
    let userId = req.params.userId;
    let mechanicId = req.params.mechanicId;
    let type = req.body.type;
    let text = req.body.text;

    

    try {

        if(text === "" || text === null){
            return res.status(400).send({message:"Text is required",status:400})
        }
        let data = await chat.create({
            userId:userId,
            mechanicId:mechanicId,
            type:type,
            text:text
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }

}

exports.getChat= async(req,res)=>{
    let userId = req.params.userId;
    let mechanicId =req.params.mechanicId;

    try {
        let data = await chat.find({userId:userId,mechanicId:mechanicId

        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}


exports.sendTowingText = async(req,res)=>{
    let userId = req.params.userId;
    let towingId = req.params.towingId;
    let type = req.body.type;
    let text = req.body.text;

    

    try {

        if(text === "" || text === null){
            return res.status(400).send({message:"Text is required",status:400})
        }
        let data = await towingChat.create({
            userId:userId,
            towingId:towingId,
            type:type,
            text:text
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }

}

exports.getTowingChat= async(req,res)=>{
    let userId = req.params.userId;
    let towingId =req.params.towingId;

    try {
        let data = await towingChat.find({userId:userId,towingId:towingId

        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}

exports.sendUserAdminText = async(req,res)=>{
    let userId = req.params.userId;
    let adminId = req.params.adminId;
    let type = req.body.type;
    let text = req.body.text;

    

    try {
let userData = await user.findOne({_id:userId})

        if(text === "" || text === null){
            return res.status(400).send({message:"Text is required",status:400})
        }
        let data = await admin.create({
            userId:userId,
            adminId:adminId,
            username:userData.first_name + " "+ userData.last_name,
            type:type,
            text:text
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }

}

exports.getUserAdminChat= async(req,res)=>{
    let userId = req.params.userId;
    let adminId =req.params.adminId;

    try {
        let data = await admin.find({userId:userId,adminId:adminId

        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}


exports.sendMechanicAdminText = async(req,res)=>{
    let adminId = req.params.adminId;
    let mechanicId = req.params.mechanicId;
    let type = req.body.type;
    let text = req.body.text;

    

    try {

        let mechanicData = await mechanic.findOne({_id:mechanicId})
        if(text === "" || text === null){
            return res.status(400).send({message:"Text is required",status:400})
        }
        let data = await admin.create({
            adminId:adminId,
            mechanicId:mechanicId,
            mechanicName:mechanicData.name,
            type:type,
            text:text
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }

}

exports.getMechanicAdminChat= async(req,res)=>{
    let adminId = req.params.adminId;
    let mechanicId =req.params.mechanicId;

    try {
        let data = await admin.find({mechanicId:mechanicId,adminId:adminId

        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}


exports.sendTowingAdminText = async(req,res)=>{
    let adminId = req.params.adminId;
    let towingId = req.params.towingId;
    let type = req.body.type;
    let text = req.body.text;

    

    try {

        let towingData = await towing.findOne({_id:towingId})
        if(text === "" || text === null){
            return res.status(400).send({message:"Text is required",status:400})
        }
        let data = await admin.create({
            adminId:adminId,
            towingId:towingId,
            towingName:towingData.name,
            type:type,
            text:text
        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }

}

exports.getTowingAdminChat= async(req,res)=>{
    let towingId = req.params.towingId;
    let adminId =req.params.adminId;

    try {
        let data = await admin.find({towingId:towingId,adminId:adminId

        })

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}


exports.getAllChatUser = async(req,res)=>{
    let id = req.params.id;

    try {

       let data = await admin.find({type:"User"},{
        "username":1,
        "userId":1
      
       })

    //  console.log("data=====>",data)
// Function to filter unique objects based on the 'userId' property
function filterUniqueObjectsByUserId(array) {
    const seenUserIds = new Set();
    return array.filter((item) => {
      const userId = item.userId.toString(); // Convert ObjectId to string for comparison
      if (seenUserIds.has(userId)) {
        return false;
      }
      seenUserIds.add(userId);
      return true;
    });
  }
  
  // Example usage: Filtering unique objects based on the 'userId' property
  const uniqueObjects = filterUniqueObjectsByUserId(data);
  
  console.log(uniqueObjects);
    //    function onlyUnique(value, index, array) {
    //     return array.indexOf(value) === index;
    //    }
       

// var arr =[
   
// ]
// // usage example:
// var unique = data.filter((item)=>{
  
//   arr.push({ userName:item.username,userId:item.userId})
// }
//    );
      
//    var unique = arr.filter(onlyUnique);
      
//    console.log(unique)
        
       return res.status(200).send({data: uniqueObjects, message:"Success",status:200})
    } catch (error) {
       return res.status(500).send({ message: error.message, "status": 500 })

    }

}



exports.getAllChatMechanic = async(req,res)=>{
    let id = req.params.id;

    try {

       let data = await admin.find({type:"Mechanic"},{
        "mechanicName":1,
        "mechanicId":1
       })

     

  
    //  console.log("data=====>",data)
// Function to filter unique objects based on the 'userId' property
function filterUniqueObjectsByUserId(array) {
    const seenUserIds = new Set();
    return array.filter((item) => {
      const mechanicId = item.mechanicId.toString(); // Convert ObjectId to string for comparison
      if (seenUserIds.has(mechanicId)) {
        return false;
      }
      seenUserIds.add(mechanicId);
      return true;
    });
  }
  
  // Example usage: Filtering unique objects based on the 'userId' property
  const uniqueObjects = filterUniqueObjectsByUserId(data);
  
  console.log(uniqueObjects);
        
       return res.status(200).send({data: uniqueObjects, message:"Success",status:200})
    } catch (error) {
       return res.status(500).send({ message: error.message, "status": 500 })

    }

}

exports.getAllChatTowing = async(req,res)=>{
    let id = req.params.id;

    try {

       let data = await admin.find({type:"Towing"},{
        "towingName":1,
        "towingId":1
       })

     
// Function to filter unique objects based on the 'userId' property
function filterUniqueObjectsByUserId(array) {
    const seenUserIds = new Set();
    return array.filter((item) => {
      const towingId = item.towingId.toString(); // Convert ObjectId to string for comparison
      if (seenUserIds.has(towingId)) {
        return false;
      }
      seenUserIds.add(towingId);
      return true;
    });
  }
  
  // Example usage: Filtering unique objects based on the 'userId' property
  const uniqueObjects = filterUniqueObjectsByUserId(data);
  
  console.log(uniqueObjects);

        
       return res.status(200).send({data: uniqueObjects, message:"Success",status:200})
    } catch (error) {
       return res.status(500).send({ message: error.message, "status": 500 })

    }

}
