
const express = require('express');
const router = express.Router();
const WarrantyHistory = require('../models/WarrantyHistoryLogs');


router.get('/warranty_history', async (req, res) => {
  try {
    const warrantyHistory = await WarrantyHistory.findAll();
    res.json(warrantyHistory);
  } catch (error) {
    console.error('Error fetching warranty history:', error);
    res.status(500).json({ message: 'Server error',error:error.message });
  }
});



module.exports = router;
