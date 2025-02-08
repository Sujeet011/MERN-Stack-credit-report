const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobilePhone: { type: String, required: true },
  pan: { type: String, required: true },
  creditScore: { type: Number, required: true },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAmount: Number,
    unsecuredAmount: Number,
    last7DaysEnquiries: Number,
  },
  creditAccounts: [
    {
      creditCard: String,
      bank: String,
      address: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Report", reportSchema);
