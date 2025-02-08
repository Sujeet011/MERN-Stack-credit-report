const Report = require("../models/Report");

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching reports", error: err.message });
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "❌ Report not found" });

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ message: "❌ Error fetching report", error: err.message });
  }
};

exports.deleteReportById = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "❌ Report not found" });

    res.status(200).json({ message: "✅ Report deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error deleting report", error: err.message });
  }
};
