import prisma from "../../prisma/prismaClient.js";
import B2Service from "./b2.service.js";

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

  async getCurrentCases() {
    return prisma.case.findMany({
      where: {
        status: { notIn: ["closed", "canceled"] },
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

  async changeStatus(caseId, status) {
    let closed_at = null;

    if (status === "closed") {
      closed_at = new Date();

      const currentCase = await prisma.case.findUnique({ where: { id: +caseId } });

      if (!currentCase) {
        return { status: "error", message: "Case not found" };
      }

      if (currentCase.isPaid === false) {
        return { status: "error", message: "Case is not paid" };
      }
    }

    return prisma.case.update({
      where: { id: +caseId },
      data: { status, closed_at },
    });
  }

  async setCasePaid(id) {
    return prisma.case.update({
      where: { id: +id },
      data: { isPaid: { set: true } }
    })
  }

  async assignCase(id, userId) {
    return prisma.case.update({
      where: { id: +id },
      data: {
        assigned_employee_id: userId ? +userId : null
      }
    })


  }

  async deleteCase(id) {
    const files = await prisma.file.findMany({ where: { case_id: +id } })
    for (const file of files) {
      await B2Service.deleteFile(file.file_url)
    }
    const deletedCase = await prisma.case.delete({ where: { id: +id } });
    return deletedCase;
  }

  async getComplatedCases() {
    return prisma.case.findMany({
      where: { status: "completed" },
      include: {
        assignedEmployee: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
  }


  async getUnpaidCases() {
    return prisma.case.findMany({
      where: {
        isPaid: false,
        payment_type: { not: 'for_free' },
        status: { not: "waiting" }
      },
      select: {
        id: true,
        entryNumber: true,
        caseNumber: true,
        price: true,
        payment_type: true,
        isPaid: true,
      }
    });
  }

  async getWaitingCases() {
    return prisma.case.findMany({
      where: {
        status: "waiting",
        assigned_employee_id: null
      },
      select: {
        id: true,
        entryNumber: true,
        caseNumber: true,
        investigatedAddress: true,
      }
    })
  }

  async getUserCases(userId) {
    const currentCases = await prisma.case.findMany({
      where: {
        status: { notIn: ["closed", "canceled"] },
        assigned_employee_id: +userId,
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

    const lastFiveClosedCases = await prisma.case.findMany({
      where: {
        status: "closed",
        assigned_employee_id: +userId
      },
      orderBy: {
        closed_at: "desc"
      },
      take: 5,
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

    return {
      currentCases,
      lastFiveClosedCases
    }
  }
  async getArchiveCases(page = 1, limit = 10, search = '', startDate, endDate) {
    const skip = (page - 1) * limit;

    const searchableFields = [
      "judge",
      "entryNumber",
      "caseNumber",
      "plaintiff",
      "defendant",
    ];

    const orFilters = searchableFields.map(field => ({
      [field]: { contains: search, mode: "insensitive" }
    }));

    const where = {
      status: { in: ["closed", "canceled"] },
      ...(search ? { OR: orFilters } : {})
    };

    if (startDate || endDate) {
      const entryDate = {};
      if (startDate) {
        entryDate.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        entryDate.lte = end;
      }
      where.entryDate = entryDate;
    }

    const [cases, total] = await Promise.all([
      prisma.case.findMany({
        where,
        skip,
        take: +limit,
        orderBy: { entryDate: 'desc' },
        include: {
          assignedEmployee: {
            select: {
              first_name: true,
              last_name: true,
            },
          },
        },
      }),
      prisma.case.count({ where })
    ])

    return { cases, total };
  }

  async getUserCases(userId) {
    const currentCases = await prisma.case.findMany({
      where: {
        status: { notIn: ["closed", "canceled"] },
        assigned_employee_id: +userId,
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

    const lastFiveClosedCases = await prisma.case.findMany({
      where: {
        status: "closed",
        assigned_employee_id: +userId
      },
      orderBy: {
        closed_at: "desc"
      },
      take: 5,
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

    return {
      currentCases,
      lastFiveClosedCases
    }
  }
}
export default new CaseService();