import statsService from "../services/stats.service.js";
import caseService from "../services/case.service.js";

class DashboardController {
    async getDashboardData(req, res) {
        try {
            let aborted = false;
            req.on("aborted", () => (aborted = true));

            const promises = {
                stats: statsService.getStats(),
                yearlyCasesChart: statsService.getYearlyCasesCount(),
                yearlyProfitChart: statsService.getYearlyProfitData(),
                unpaidCases: caseService.getUnpaidCases(),
                completedCases: caseService.getComplatedCases(),
            };

            const results = await Promise.allSettled(Object.values(promises));

            if (aborted) return; 

            const data = {};
            Object.keys(promises).forEach((key, i) => {
                const r = results[i];
                if (r.status === "fulfilled") data[key] = r.value;
                else console.error("Dashboard error in", key, r.reason);
            });

            res.status(200).json({ status: "ok", payload: data });
        } catch (error) {
            if (req.aborted) return;
            console.error(error);
            res.status(500).json({ status: "error", message: "Something went wrong" });
        }
    }
}

export default new DashboardController();