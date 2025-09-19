import prisma from "../../prisma/prismaClient.js";

class CaseService {
  async createCase(caseData) {
    const { assigned_employee_id, ...newCase } = caseData;

    return prisma.case.create({
      data: {
        ...newCase,
        ...(assigned_employee_id
          ? {
              assignedEmployee: {
                connect: { id: +assigned_employee_id }
              }
            }
          : {})
      },
      select: {
        id: true,
        entryDate: true,
        entryNumber: true,
        caseNumber: true,
        investigatedAddress: true,
        assignedEmployee: true,
        status: true,
      }
    });
  }

  async getAllCases() {
    return prisma.case.findMany({
      select: {
        id: true,
        entryDate: true,
        entryNumber: true,
        caseNumber: true,
        investigatedAddress: true,
        assignedEmployee: true,
        status: true,
      }
    });
  }

  async getCaseById(id) {
    return prisma.case.findUnique({
      where: { id: +id },
      include: {
        assignedEmployee: true,
        expenditures: true,
        notes: true,
        files: true,
      }
    });
  }

  async updateCase(id, data) {
    return prisma.case.update({
      where: { id: +id },
      data: {
        entryDate: data.entryDate ? new Date(data.entryDate) : undefined,
        entryNumber: data.entryNumber,
        caseNumber: data.caseNumber,
        judge: data.judge,
        plaintiff: data.plaintiff,
        defendant: data.defendant,
        investigatedAddress: data.investigatedAddress,
        propertyType: data.propertyType,
        caseType: data.caseType,
        price: typeof data.price === "string" ? parseFloat(data.price) : data.price,
        payment_type: data.payment_type,
        isPaid: data.isPaid,
        status: data.status,
        closed_at: data.closed_at ? new Date(data.closed_at) : undefined,
        assigned_employee_id: data.assigned_employee_id || null,
      },
      include: {
        assignedEmployee: true,
        expenditures: true,
        notes: true,
        files: true,
      }
    });
  }

  async deleteCase(id) {
    return prisma.case.delete({ where: { id: +id } });
  }
}

export default new CaseService();