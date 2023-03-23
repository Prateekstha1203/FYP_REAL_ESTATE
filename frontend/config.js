


import SES from 'aws-sdk/clients/ses.js';
export const DATABASE = 'mongodb://127.0.0.1:27017/realEstate_FYP';

export const EMAIL_FROM = '"Pratik Shrestha" <alextronner123@gmail.com>';
export const REPLY_TO = "alextronner123@gmail.com";

export const CLIENT_URL = "http://localhost:3000";
export const JWT_SECRET = "ajsdhfiuasjdfnaksfjna";

// // rL9KgqTRLaraaAfS
// // export const DATABASE = "mongodb+srv://real-estate-fyp:rL9KgqTRLaraaAfS@real-estate-fyp.u45waue.mongodb.net/?retryWrites=true&w=majority"

// export const AWS_ACCESS_KEY_ID = "AKIA44VTXTLKEYRYK7HK";
// export const AWS_SECRET_ACCESS_KEY = "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";
// //T4k3DchhYuM/hnZsw2wbpaxuaXEn5M8Y1IlQdk/Z

const awsConfig = {
  accessKeyId: "AKIA44VTXTLKEYRYK7HK",
  secretAccessKey: "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",
  region: "us-east-1",
  apiVersion: "2010-12-01",
};

export const AWSSES = new SES(awsConfig);
