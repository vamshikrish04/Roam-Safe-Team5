module.exports = (app) => {

    const userSign = require('../controllers/userSignUp.controller');

    const mechanic = require("../controllers/mechanic.controller")

    const car  = require("../controllers/car.controller")

    const book = require("../controllers/bookMechanic.controller")

    const rating = require("../controllers/rating.controller")

    const towing = require("../controllers/towing.controller")

    const towingBook= require("../controllers/towingBooking.controller")

    const chat = require("../controllers/chat.controller")

    const middleware = require("../middleware/uploads")
    // ---------------user api start from here--------------------------------

    app.post('/api/userSignUP' ,userSign.userSignUP);

    app.post('/api/UserLogin' ,userSign.UserLogin);

    app.get("/api/getUserInfo/:id",userSign.getUserInfo)

    app.put("/api/updateUserInfo/:id",userSign.updateUserInfo)

    app.post("/api/mechanicSignUP",middleware.uploadDocument.fields([{ name: 'document' },{name:'licence'},{ name: 'store_paper' }]),mechanic.mechanicSignUP)

    app.put("/api/addServiesProvided/:id",mechanic.addServiesProvided)


    app.post("/api/mechanicLogin",mechanic.mechanicLogin)

    app.put("/api/addUserLatLong/:id",userSign.addUserLatLong)

    app.put("/api/addMechanicLatLong/:id",mechanic.addMechanicLatLong)

    app.post("/api/addCar/:userId",car.addCar)

    app.post("/api/bookMechanic/:userId/:mechanicId",book.bookMechanic)

    app.get("/api/getMechanicInfo/:id",mechanic.getMechanicInfo)

    app.put("/api/updateMechanicInfo/:id",mechanic.updateMechanicInfo)

    app.put("/api/bookingAcceptOrRejectByMachenic/:id",book.bookingAcceptOrRejectByMachenic)

     app.post("/api/addReviewRating/:userId/:mechanicId",rating.addReviewRating)
 
    app.get("/api/getRatingData/:allActive",rating.getRatingData)

    app.get("/api/getAvgRatingOfMechanic/:mechanicId",rating.getAvgRatingOfMechanic)

    app.get("/api/nearestMechanic/:latitude/:longitude/:maxDistance",userSign.nearestMechanic)

    app.post("/api/bookMechanicForEmergencyService/:userId/:mechanicId",userSign.bookMechanicForEmergencyService)
    
    app.post("/api/towingProviderSignUP",middleware.uploadDocument.fields([{ name: 'document' },{name:'licence'}, { name: 'store_paper' }]),towing.towingProviderSignUP)+

    app.post("/api/towingLogin",towing.towingLogin)


    app.put("/api/addTowingProviderLatLong/:id",towing.addTowingProviderLatLong)

    app.get("/api/getNearestTowingPrivider/:latitude/:longitude/:maxDistance",towingBook.getNearestTowingPrivider)
  
    app.post("/api/bookingTowingProvider/:userId/:towingId",towingBook.bookingTowingProvider)

    app.get("/api/getTowingBooking/:allActive",towing.getTowingBooking)

    app.get("/api/getTowingInfo/:id",towing.getTowingInfo)

    app.post("/api/addContactForm",userSign.addContactForm)

    app.put("/api/towingRequestAcceptOrRejectByTowingProvider/:bookingId",towing.towingRequestAcceptOrRejectByTowingProvider)

    app.post("/api/sendText/:userId/:mechanicId",chat.sendText)

    app.get("/api/getChat/:userId/:mechanicId",chat.getChat)

    
    app.post("/api/sendTowingText/:userId/:towingId",chat.sendTowingText)

    app.get("/api/getTowingChat/:userId/:towingId",chat.getTowingChat)

    app.post("/api/addReviewRatingForTowing/:userId/:towingId",rating.addReviewRatingForTowing)
 
    app.get("/api/getTowingRatingData/:allActive",rating.getTowingRatingData)

    app.get("/api/getAvgRatingOfTowing/:towingId",rating.getAvgRatingOfTowing)

    app.put("/api/emergencyBookingAcceptOrRejectByMechanic/:id",mechanic.emergencyBookingAcceptOrRejectByMechanic)

    
    app.post("/api/sendUserAdminText/:userId/:adminId",chat.sendUserAdminText)

    app.get("/api/getUserAdminChat/:userId/:adminId",chat.getUserAdminChat)

    app.post("/api/sendMechanicAdminText/:mechanicId/:adminId",chat.sendMechanicAdminText)

    app.get("/api/getMechanicAdminChat/:mechanicId/:adminId",chat.getMechanicAdminChat)

    
    app.post("/api/sendTowingAdminText/:towingId/:adminId",chat.sendTowingAdminText)

    app.get("/api/getTowingAdminChat/:towingId/:adminId",chat.getTowingAdminChat)

    app.post("/api/bookingPaymentforMechanic/:bookId/:userId/:mechanicId",userSign.bookingPaymentforMechanic)

    app.post("/api/emergencyBookPaymentforMechanic/:bookId/:userId/:mechanicId",userSign.emergencyBookPaymentforMechanic)

    app.post("/api/PaymentforTowingProvider/:bookId/:userId/:towingId",userSign.PaymentforTowingProvider)
 
    app.get("/api/getPaymentHistory/:allActive",userSign.getPaymentHistory)

    app.put("/api/getAmountBasedOnDistance/:bookId",towingBook.getAmountBasedOnDistance)

    app.get("/api/GetBookingAmount/:bookId",towingBook.GetBookingAmount)

    app.put("/api/addAmountForEmergencyService/:bookId",mechanic.addAmountForEmergencyService)

    app.get("/api/getAmountForEmergencyBooking/:bookId",mechanic.getAmountForEmergencyBooking)
  
    app.put("/api/addAmountForRegularService/:bookId",mechanic.addAmountForRegularService)

    app.get("/api/getAmountForRegularBooking/:bookId",mechanic.getAmountForRegularBooking)

}