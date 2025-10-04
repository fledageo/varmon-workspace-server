import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "eu-central-003",
  endpoint: "https://s3.eu-central-003.backblazeb2.com",
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APPLICATION_KEY,
  },
});


export default s3;