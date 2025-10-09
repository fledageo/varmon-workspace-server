import StatsService from "../services/stats.service.js";

class StatsController {
    async getStats(req, res) {
        try {
            const stats = await StatsService.getStats()
            return res.json({ status: "ok", payload: stats })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", message: "Something went wrong" })
        }
    }

    async getYearlyProfit(req, res) {
        try {
            const YearlyProfitData = await StatsService.getYearlyProfitData()
            return res.json({ status: "ok", payload: YearlyProfitData })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", message: "Something went wrong" })
        }
    }

    async getYearlyCasesCount(req, res) {
        try {
            const YearlyCasesCount = await StatsService.getYearlyCasesCount()
            return res.json({ status: "ok", payload: YearlyCasesCount })
        } catch (err) {
            console.error(err)
            res.status(500).json({ status: "error", message: "Something went wrong" })
        }
    }
}

export default new StatsController()