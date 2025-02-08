const fs = require("fs");
const xml2js = require("xml2js");
const Report = require("../models/Report");

exports.uploadXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "❌ No file uploaded" });
    }

    const xmlData = fs.readFileSync(req.file.path, "utf-8");
    const parser = new xml2js.Parser({ explicitArray: false });

    parser.parseString(xmlData, async (err, result) => {
      if (err) {
        console.error("❌ XML Parsing Error:", err);
        return res.status(500).json({ message: "❌ XML Parsing Error", error: err });
      }

      const reports = result?.CreditReports?.CreditReport;
      if (!reports) {
        return res.status(400).json({ message: "❌ Invalid XML structure" });
      }

      const reportsArray = Array.isArray(reports) ? reports : [reports];

      const parsedReports = reportsArray.map((data) => ({
        name: data.PersonalDetails?.Name || "Unknown",
        mobilePhone: data.PersonalDetails?.Phone || "N/A",
        pan: data.PersonalDetails?.PAN || "N/A",
        creditScore: parseInt(data.Score) || 0,
        reportSummary: {
          totalAccounts: parseInt(data.Summary?.TotalAccounts) || 0,
          activeAccounts: parseInt(data.Summary?.ActiveAccounts) || 0,
          closedAccounts: parseInt(data.Summary?.ClosedAccounts) || 0,
          currentBalance: parseFloat(data.Summary?.CurrentBalance) || 0,
          securedAmount: parseFloat(data.Summary?.SecuredAmount) || 0,
          unsecuredAmount: parseFloat(data.Summary?.UnsecuredAmount) || 0,
          last7DaysEnquiries: parseInt(data.Summary?.Last7DaysEnquiries) || 0,
        },
        creditAccounts: Array.isArray(data.CreditAccounts?.Account)
          ? data.CreditAccounts.Account.map((acc) => ({
              creditCard: acc?.CreditCard || "N/A",
              bank: acc?.Bank || "N/A",
              address: acc?.Address || "N/A",
              accountNumber: acc?.AccountNumber || "N/A",
              amountOverdue: parseFloat(acc?.AmountOverdue) || 0,
              currentBalance: parseFloat(acc?.CurrentBalance) || 0,
            }))
          : [],
      }));

      const savedReports = await Report.insertMany(parsedReports);
      res.json({ message: "✅ File uploaded and data saved successfully!", savedReports });
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
};
