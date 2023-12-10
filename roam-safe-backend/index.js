const express=require('express');
const app=express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const db = require("./models/db.connection.on");
const http = require('http');
const https = require('https');


//cors option
let corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// app.get('/',function(req,res){
//     res.sendFile(path.join(__dirname+'/index.html'));
//     //__dirname : It will resolve to your project folder.
//   });



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'website')));
app.use(express.static(path.join(__dirname, 'website/build')))
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html'));
// });


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'website/build', '/index.html'));
  //__dirname : It will resolve to your project folder.
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'website')));
app.use(express.static(path.join(__dirname, 'website/admin-panel')))

app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, 'website/admin-panel', 'index.html'));
});


app.use(express.json())
 mongoose.set('strictQuery', false);
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
})

.then(() => {
    console.log('Successfully connected to the MongoDB database');
})
.catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
});

require('./routes/User.route')(app);
require("./routes/admin.routes")(app)
app.listen(80, () => { console.log("server run on port 80") });


var fs = require('fs');

var key = fs.readFileSync('private.key');
var cert = fs.readFileSync('certificate.crt');
var ca = fs.readFileSync('ca_bundle.crt');

var options = {
  key: key,
  cert: cert,
  ca: ca,
  requestCert: false,
  rejectUnauthorized: false
};

const httpsServer = https.createServer(options, app).listen(443, () => {
  console.log("https server running successfully");
});

// const httpsServer = https.createServer(options, app).listen(443, () => {
//     console.log("https server running successfully");
// });


// const accountSid = 'your_account_sid';
// const authToken = 'your_auth_token';
// const twilioPhoneNumber = 'your_twilio_phone_number';

// const twilio = require('twilio');
// const client = new twilio(accountSid, authToken);

// // Function to create a video room
// async function createVideoRoom() {
//   try {
//     const room = await client.video.rooms.create({ uniqueName: 'my-room-name' });
//     console.log(`Video room created with SID: ${room.sid}`);
//     return room.sid;
//   } catch (error) {
//     console.error('Error creating video room:', error.message);
//   }
// }

// // Function to generate a Twilio access token
// function generateAccessToken(identity) {
//   const AccessToken = twilio.jwt.AccessToken;
//   const VideoGrant = AccessToken.VideoGrant;

//   // Create an access token
//   const token = new AccessToken(accountSid, apiKey, apiSecret);

//   // Set the identity of the token
//   token.identity = identity;

//   // Grant access to Video
//   const grant = new VideoGrant();
//   token.addGrant(grant);

//   // Serialize the token to a JWT string
//   return token.toJwt();
// }

// // Usage example
// const roomSid = await createVideoRoom();
// const participantToken = generateAccessToken('participant-identity');
// const hostToken = generateAccessToken('host-identity');

// // Connect participants to the room
// await client.video.rooms(roomSid).participants.create({ identity: 'participant-identity', token: participantToken });
// await client.video.rooms(roomSid).participants.create({ identity: 'host-identity', token: hostToken });
