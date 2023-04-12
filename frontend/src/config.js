


import SES from 'aws-sdk/clients/ses.js';
export const DATABASE = 'mongodb://127.0.0.1:27017/realEstate_FYP';

export const EMAIL_FROM = '"Pratik Shrestha" <alextronner123@gmail.com>';
export const REPLY_TO = "alextronner123@gmail.com";

export const CLIENT_URL = "http://localhost:3000";
export const JWT_SECRET = "ajsdhfiuasjdfnaksfjna";


const awsConfig = {
  accessKeyId: "AKIA44VTXTLKEYRYK7HK",
  secretAccessKey: "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",
  region: "us-east-1",
  apiVersion: "2010-12-01",
};

export const AWSSES = new SES(awsConfig);
export const GOOGLE_PLACES_API_KEY = 'AIzaSyA8_IPJ-cEm7Dd7arvPNTSJVN-Ft-pM5dQ';