const path = require("path");
const s3 = require("../config/b2.js");
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

class B2Service {
  async uploadTempFile(file, caseId, caseNumber) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const safeCaseNumber = caseNumber.replace(/\//g, "_");

    const key = `temp/${caseId}/${safeCaseNumber}_${timestamp}_${safeName}${ext}`;

    await s3.send(new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype 
    }));

    return key;
  }


  async deleteFile(key) {
    return await s3.send(new DeleteObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key
    }));
  }


  async downloadFile(key) {
    return await s3.send(new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key
    }));
  }
}

module.exports = new B2Service();
