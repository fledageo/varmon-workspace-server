const prisma = require("../../prisma/prismaClient.js");

class StatsService {
    async getStats() {
        const now = new Date();

        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);


        const [doneYear, doneMonth, inProgress, waiting] = await Promise.all([
            prisma.case.count({
                where: {
                    status: "closed",
                    closed_at: { gte: startOfYear },
                },
            }),
            prisma.case.count({
                where: {
                    status: "closed",
                    closed_at: { gte: startOfMonth, lte: endOfMonth },
                },
            }),
            prisma.case.count({
                where: { status: "in_progress" },
            }),
            prisma.case.count({
                where: { status: "waiting" },
            }),
        ]);

        return {
            doneYear,
            doneMonth,
            inProgress,
            waiting,
        };
    }

    async getUserStats(userId) {
        const now = new Date();

        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        const [doneYear, doneMonth] = await Promise.all([
            prisma.case.count({
                where: {
                    status: "closed",
                    closed_at: { gte: startOfYear },
                    assigned_employee_id: +userId,
                }
            }),
            prisma.case.count({
                where: {
                    status: "closed",
                    closed_at: { gte: startOfMonth, lte: endOfMonth },
                    assigned_employee_id: +userId
                }
            })
        ]);

        return {
            doneYear,
            doneMonth
        };
    }

    async getYearlyProfitData() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const cases = await prisma.case.findMany({
            where: {
                status: "closed",
                closed_at: {
                    gte: startOfYear,
                    lte: now,
                }
            },
            select: {
                price: true,
                closed_at: true
            }
        })

        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i,
            profit: 0
        }));

        for (let c of cases) {
            const monthIndex = c.closed_at.getMonth(); 
            months[monthIndex].profit += c.price;
        }

        return months.slice(0, now.getMonth() + 1);
    }


    async getYearlyCasesCount() {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const cases = await prisma.case.findMany({
            where: {
                status: "closed",
                closed_at: {
                    gte: startOfYear,
                    lte: now,
                }
            },
            select: {
                closed_at: true
            }
        })
        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i,
            cases: 0
        }));

        for (let c of cases) {
            const monthIndex = c.closed_at.getMonth(); 
            months[monthIndex].cases += 1;
        }
        return months.slice(0, now.getMonth() + 1);
    }

    async getUserYearlyCasesCount(userId) {
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const cases = await prisma.case.findMany({
            where: {
                status: "closed",
                closed_at: { 
                    gte: startOfYear,
                    lte: now
                 },
                assigned_employee_id: +userId,
            },
            select: {
                closed_at: true
            }
        })

        const months = Array.from({ length: 12 }, (_, i) => ({
            month: i,
            cases: 0
        }));

        for (let c of cases) {
            const monthIndex = c.closed_at.getMonth();
            months[monthIndex].cases += 1;
        }

        return months.slice(0, now.getMonth() + 1);
    }
}

module.exports = new StatsService();