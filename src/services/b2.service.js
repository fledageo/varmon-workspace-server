import path from "path";
import s3 from "../config/b2.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";

class B2Service {
  async uploadTempFile(file, caseId, caseNumber) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const safeCaseNumber = caseNumber.replace(/\//g, "_");
    
    const key = `temp/${caseId}/${safeCaseNumber}_${timestamp}_${safeName}${ext}`;
  
    const result = await s3.send(new PutObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: "application/pdf"
    }));
    console.log(result)

    return key;
  }
}

export default new B2Service();
