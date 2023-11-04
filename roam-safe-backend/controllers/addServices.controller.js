
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const service = require("../models/addServices.model")

exports.addServices = async(req,res)=>{
    let serviceName = req.body.serviceName ? req.body.serviceName :'';

    const regex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;

        try {
            if(serviceName === null || serviceName ===''){
             return res.status(400).send({message:"Service name is require",status:400})
            }else{
                if(!serviceName.match(regex)){
                    return res.status(400).send({message:"First letter should be capital and only alphabates are allowed",status:400})

                }
            }

            let data = await service.create({
                serviceName:serviceName
            })
        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}

exports.getServices = async(req,res)=> {
    let id = req.params.id;

    try {
         
        let userAccording = req.params.allActive;
        console.log(userAccording);
        let userTypeSplit = userAccording.split("_");
        let getServiceCondition = '';
        switch (userTypeSplit[0]) {
          case 'All':
            getServiceCondition = {}; 
              break;
          case 'id':
            getServiceCondition = { _id:userTypeSplit[1]};
              break;
      
          default:
            getServiceCondition = { message:"Please provide valid type"};
              break;
        }
        let data = await service.find(getServiceCondition)
        if(!data){
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}

exports.deleteServices = async(req,res) =>{
    let id = req.params.id;
    try {
        let data = await service.findOneAndDelete({_id:id})

        return res.status(200).send({message:"Service deleted successfully",status: 200});
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}

exports.updateServices = async(req,res)=>{
    let id = req.params.id;
    let serviceName = req.body.serviceName ? req.body.serviceName :'';

    const regex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;

        try {
            if(serviceName === null || serviceName ===''){
             return res.status(400).send({message:"Service name is require",status:400})
            }else{
                if(!serviceName.match(regex)){
                    return res.status(400).send({message:"First letter should be capital and only alphabates are allowed",status:400})

                }
            }

            let getData = await service.findOne({_id:id})
            if(getData.serviceName===serviceName){

            }else{
                let checkServiceName = await service.findOne({serviceName:serviceName})

                if(checkServiceName){
                    return res.status(409).send({message:"Service name already exist",status:409})

                }
            }

            let data = await service.findOneAndUpdate({_id:id},{
              $set: 
              { 
                 serviceName:serviceName
            }
            },{new:true})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}
   
exports.getServicesNameOnly = async(req,res)=> {

    try {
         
       
        let data = await service.find({},{
            _id:0,
            createdAt:0,
            updatedAt:0,
            __v:0
        })
        if(!data){
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}
