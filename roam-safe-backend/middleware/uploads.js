const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3-v2');
const fs = require('fs');

//for aws
const AWS = require('aws-sdk');
// var multerS3 = require('multer-s3')

const s3 = new AWS.S3({

    accessKeyId: 'AKIAYGMZRHETIJRNGMOK',
    secretAccessKey: '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'

    
});

//for testing the connection with s3 bucket
s3.listBuckets(function (err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
});

// //function for media uploading on aws s3 bucket
function mediaUploading(mediaPath) {
    // console.log("Path: "+mediaPath);
    return storage = multerS3({
        s3: s3,
        bucket: 'roamsafe',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            //console.log("metadata with stringify: ==== "+JSON.stringify(file));
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            //console.log("key with stringify: ==== "+JSON.stringify(file));
            let ext = path.extname(file.originalname);
            var media_path = mediaPath;
            cb(null,  media_path + "/"+`${Date.now()}${ext}`);
        }
    });
}



let uploadDocument = multer({
    // storage: storage,
    storage: mediaUploading('Document'),
    fileFilter: function (req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || 'application/pdf' ) {
            callback(null, true);
        } else {
            console.log("Only jpg , png , pdf files supported");
            callback(null, false)
        }
    }
});



// let licenseImage = multer({
//     //  storage: productStorage,
//     storage: mediaUploading('license'),
//     fileFilter: function (req, file, callback) {
//         if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || 'application/pdf' ) {
//             callback(null, true);
//         } else {
//             console.log("Only jpg , png , pdf files supported");
//             callback(null, false)
//         }
//     }
// });

// let storePaperImage = multer({
//     //  storage: productStorage,
//     storage: mediaUploading('store_paper'),
//     fileFilter: function (req, file, callback) {
//         if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || 'application/pdf' ) {
//             callback(null, true);
//         } else {
//             console.log("Only jpg , png , pdf files supported");
//             callback(null, false)
//         }
//     }
// });

module.exports = {
    uploadDocument,
    // licenseImage,
    // storePaperImage,
    s3

};