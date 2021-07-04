const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-2" });

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2021-01-13" });

// Call S3 to list the buckets
s3.listBuckets(function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

// Configure aws with your accessKeyId and your secretAccessKey
// aws.config.update({
//   region: 'us-east-1', // Put your aws region here
//   accessKeyId: process.env.AWSAccessKeyId,
//   secretAccessKey: process.env.AWSSecretKey
// })
