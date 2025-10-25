import DashboardService from "../services/dashboard.service.js"
import statsService from "../services/stats.service.js";
import caseService from "../services/case.service.js";

class DashboardController {
    async getDashboardData(req, res) {
        try {
            const [stats, yearlyProfitChart, yearlyCasesChart, unpaidCases, completedCases] = 
                await Promise.all([
                    statsService.getStats(),
                    statsService.getYearlyCasesCount(),
                    statsService.getYearlyProfitData(),
                    caseService.getUnpaidCases(),
                    caseService.getComplatedCases()
                ])
            
            const data = { stats, yearlyProfitChart, yearlyCasesChart, unpaidCases, completedCases }    

            res.status(200).json({ status: 'ok', payload: data})
        } catch(error) {
            console.error(error);
            res.status(500).json({ status: "error", message: "Something went wrong" });
        }
    }
}

export default new DashboardController();