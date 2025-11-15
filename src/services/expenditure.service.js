const prisma = require("../../prisma/prismaClient.js");

class ExpendituresService {
  async getByCaseId(caseId) {
    return await prisma.expenditure.findMany({
      where: { case_id: +caseId },
      orderBy: { created_at: "desc" },
    });
  }

  async add(caseId, data) {
    return await prisma.expenditure.create({
      data: {
        case: { connect: { id: +caseId } },
        amount: parseFloat(data.amount),
        description: data.description,
        created_at: data.created_at ? new Date(data.created_at) : new Date(),
      },
    });
  }

  async update(id, data) {
    return await prisma.expenditure.update({
      where: { id: +id },
      data: {
        amount: data.amount !== undefined ? parseFloat(data.amount) : undefined,
        description: data.description,
        created_at: data.created_at ? new Date(data.created_at) : undefined,
      },
    });
  }

  async delete(id) {
    return await prisma.expenditure.delete({ where: { id: +id } });
  }
}

module.exports = new ExpendituresService();