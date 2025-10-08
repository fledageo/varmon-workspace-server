import prisma from "../../prisma/prismaClient.js";
import B2Service from "./b2.service.js";

class FileService {

  async getCaseFiles(caseId) {
    return prisma.file.findMany({
      where: { case_id: +caseId },
    });
  }

  async getFileById(fileId) {
    return prisma.file.findUnique({ where: { id: +fileId } });
  }


  async uploadFile(file, caseId, caseNumber) {
    const fileUrl = await B2Service.uploadTempFile(file, caseId, caseNumber);
    const createdFile = await prisma.file.create({
      data: {
        filename: file.originalname,
        file_url: fileUrl,
        caseNumber: caseNumber,
        case: {
          connect: { id: +caseId }
        }
      }    
    });
    return createdFile;
  }

  async deleteFile(fileId) {
    const file = await prisma.file.findUnique({ where: { id: +fileId } });
    await B2Service.deleteFile(file.file_url);
    await prisma.file.delete({ where: { id: +fileId } });
  }

  async downloadFile(fileUrl) {
    return await B2Service.downloadFile(fileUrl);
  }
}
export default new FileService();