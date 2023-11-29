const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config")
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const car = require("../models/car.model")



exports.addCar = async (req, res) => {
    let userId = req.params.userId;
    let car_brand = req.body.car_brand ? req.body.car_brand : '';
    let car_model = req.body.car_model ? req.body.car_model : '';
    let car_mileage = req.body.car_mileage ? req.body.car_mileage : '';
    let previous_record = req.body.previous_record ? req.body.previous_record : '';
;
    try {
        if (car_brand === null || car_brand === '') {
            res.status(400).send({ message: "Car brand is required", "status": 400 });
        } else {
            if (car_model === null || car_model === '') {
                res.status(400).send({ message: "Car model is required", "status": 400 });

            } else {
                if (car_mileage === null || car_mileage === '') {
                    res.status(400).send({ message: "Car mileage is required", "status": 400 });

                } else {
                    if (previous_record === null || previous_record === "") {
                        return res
                            .status(400)
                            .send({
                                message: "Previous record is required",
                                status: 400,
                            });
                    }
                }
            }
        }
                            
                        
            
        


        let data = await car.create({
            userId:userId,
            car_brand: car_brand,
            car_model: car_model,
            previous_record:previous_record,
            car_mileage: car_mileage

        })
        return res.status(200).send({ data: data, message: "Mechanic signUp successfuly", "status": 200 })
    } catch (error) {
        return res.status(500).send({ message: error.message, "status": 500 })
    }
}

