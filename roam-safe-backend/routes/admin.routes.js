module.exports = (app) => {

    const admin =require("../controllers/admin.controller");

    const service = require("../controllers/addServices.controller")

    const models = require("../controllers/model.controller")

    const mechanic = require("../controllers/mechanic.controller")

    const towing = require("../controllers/towing.controller")

    const chat = require("../controllers/chat.controller")



    
    // --------------------api start from here--------------------------------
    
    app.post("/api/adminSignUp" ,admin.adminSignUp );

    app.post("/api/adminLogin",admin.adminLogin)
    
   
    app.post("/api/addServices",service.addServices)

    app.get("/api/getServices/:allActive",service.getServices)
 
    app.delete("/api/deleteServices/:id",service.deleteServices)
 
    app.put("/api/updateServices/:id",service.updateServices)

    app.post("/api/addModels",models.addModels)

    app.get("/api/getModels/:allActive",models.getModels)
 
    app.delete("/api/deleteModels/:id",models.deleteModels)
 
    app.put("/api/updateModels/:id",models.updateModels)

    app.get("/api/getServicesNameOnly",service.getServicesNameOnly)

    app.get("/api/getAllUser/:allActive",admin.getAllUser)

    app.get("/api/getAllMechanic/:allActive",admin.getAllMechanic)

    app.put("/api/verifyMechanicByAdmin/:id",mechanic.verifyMechanicByAdmin)

    app.get("/api/getAllEmergencyBooking/:allActive",admin.getAllEmergencyBooking)

    app.put("/api/verifyTowingProvider/:towingId",admin.verifyTowingProvider)

    app.get("/api/getAllTowingProvider/:allActive",admin.getAllTowingProvider)

    app.get("/api/getContacts",admin.getContacts)

    app.delete("/api/deleteContact/:id",admin.deleteContact)

    app.get("/api/getMechanicBooking/:allActive",mechanic.getMechanicBooking)

    app.get("/api/getAllChatUser",chat.getAllChatUser)

    app.get("/api/getAllChatMechanic",chat.getAllChatMechanic)

    app.get("/api/getAllChatTowing",chat.getAllChatTowing)

}