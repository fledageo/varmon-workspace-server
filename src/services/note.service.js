import prisma from "../../prisma/prismaClient.js";

class NoteService {
  async getByCaseId(caseId) {
    return await prisma.note.findMany({
      where: { case_id: +caseId },
      orderBy: { created_at: "desc" },
    });
  }

  async add(caseId, data) {
    return await prisma.note.create({
      data: {
        case: { connect: { id: +caseId } },
        title: data.title,
        description: data.description,
        created_at: data.created_at ? new Date(data.created_at) : new Date(),
      },
    });
  }

  async update(id, data) {
    return await prisma.note.update({
      where: { id: +id },
      data: {
        title: data.title !== undefined ? data.title : undefined,
        description: data.description,
        created_at: data.created_at ? new Date(data.created_at) : undefined,
      },
    });
  }

  async delete(id) {
    return await prisma.note.delete({ where: { id: +id } });
  }
}

export default new NoteService();