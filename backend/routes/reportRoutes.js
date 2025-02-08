const express = require('express');
const { getAllReports, getReportById, deleteReportById } = require('../controllers/reportController');

const router = express.Router();

router.get('/', getAllReports);
router.get('/:id', getReportById);
router.delete('/:id', deleteReportById);

module.exports = router;
