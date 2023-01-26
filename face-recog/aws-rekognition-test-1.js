//Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//PDX-License-Identifier: MIT-0 (For details, see https://github.com/awsdocs/amazon-rekognition-developer-guide/blob/master/LICENSE-SAMPLECODE.)


const AWS = require('aws-sdk')
const fs = require('fs')
// const bucket        = 'face-comparision' // the bucketname without s3://
const photo_source  = './pete.jpg'
const photo_target  = './yes-pete.jpg'
const dotenv = require('dotenv');
dotenv.config();

const config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})
const client = new AWS.Rekognition();
const params = {
  SourceImage: {
    Bytes: 
  },
  TargetImage: {

  },
  SimilarityThreshold: 70
}
client.compareFaces(params, function(err, response) {
  if (err) {
    console.log(err, err.stack); // an error occurred
  } else {
    response.FaceMatches.forEach(data => {
      let position   = data.Face.BoundingBox
      let similarity = data.Similarity
      console.log(`The face at: ${position.Left}, ${position.Top} matches with ${similarity} % confidence`)
    }) // for response.faceDetails
  } // if
});