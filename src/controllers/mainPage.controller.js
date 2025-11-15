const statsService = require("../services/stats.service.js");
const caseService = require("../services/case.service.js");

class MainPageDataController {
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

    async getProfileData(req, res) {
        try {
            const { userId } = req.params;
            let aborted = false;
            req.on("aborted", () => aborted = true);

            const promise = {
                stats: statsService.getUserStats(userId),
                yearlyCasesChart: statsService.getUserYearlyCasesCount(userId)
            }

            const result = await Promise.allSettled(Object.values(promise));
            
            if(aborted) return;

            const data = {};

            Object.keys(promise).forEach((key, i) => {
                const r = result[i];
                if(r.status === 'fulfilled') data[key] = r.value;
                else console.error("Profile error", key, r.reason);
            })

            return res.status(200).json({ status: "ok", payload: data });
        } catch (err) {
            if (req.aborted) return;
            console.error(err);
            res.status(500).json({ status: "error", message: "Something went wrong" });
        }
    }
}

module.exports = new MainPageDataController();