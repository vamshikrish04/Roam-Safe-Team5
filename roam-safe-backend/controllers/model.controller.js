
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const model = require("../models/carModel.model")

exports.addModels = async(req,res)=>{
    let modelName = req.body.modelName ? req.body.modelName :'';

    const regex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;

        try {
            if(modelName === null || modelName ===''){
             return res.status(400).send({message:"Service name is require",status:400})
            }else{
                if(!modelName.match(regex)){
                    return res.status(400).send({message:"First letter should be capital and only alphabates are allowed",status:400})

                }
            }

            let data = await model.create({
                modelName:modelName
            })
        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}

exports.getModels = async(req,res)=> {
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
        let data = await model.find(getServiceCondition)
        if(data.length === 0){
            return res.status(404).send({data:data,message:"No data fount",status: 404});
        }else{
        return res.status(200).send({data:data,message:"Success",status: 200});
        }
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}

exports.deleteModels = async(req,res) =>{
    let id = req.params.id;
    try {
        let data = await model.findOneAndDelete({_id:id})

        return res.status(200).send({message:"Service deleted successfully",status: 200});
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })

    }
}

exports.updateModels = async(req,res)=>{
    let id = req.params.id;
    let modelName = req.body.modelName ? req.body.modelName :'';

    const regex = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;

        try {
            if(modelName === null || modelName ===''){
             return res.status(400).send({message:"Service name is require",status:400})
            }else{
                if(!modelName.match(regex)){
                    return res.status(400).send({message:"First letter should be capital and only alphabates are allowed",status:400})

                }
            }

            let getData = await model.findOne({_id:id})
            if(getData.modelName===modelName){

            }else{
                let checkServiceName = await model.findOne({modelName:modelName})

                if(checkServiceName){
                    return res.status(409).send({message:"Service name already exist",status:409})

                }
            }

            let data = await model.findOneAndUpdate({_id:id},{
              $set: 
              { 
                 modelName:modelName
            }
            },{new:true})

        return res.status(200).send({data:data,message:"Success",status:200})
    } catch (error) {
        return res.status(500).send({message:error.message,status:500})
    }
}
   