const express = require('express');
const router = express.Router();
const WarrantyExtend = require('../models/WarrantyExtensions');  

// Get all extended warranties
router.get('/warranty_extensions', async (req, res) => {
  try {
   
    const extend_warranty = await WarrantyExtend.findAll();
    res.json(extend_warranty);
  } catch (error) {
    console.error('Error fetching extended warranties:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/register', async (req, res) => {
  const {
   Extension_id,Asset_Id,Serial_Number, Purchased_Date, Warranty_Start_Date, Warranty_End_Date, 
   Warranty_Extend_Price, Extend_Warranty_in_Months
  } = req.body;
  
  try {
  
    const extend_warranty = await WarrantyExtend.create({
      Extension_id,
      Asset_Id,
      Serial_Number,
      Purchased_Date,
      Warranty_Start_Date,
      Warranty_End_Date,
      Warranty_Extend_Price,
      Extend_Warranty_in_Months,
      
    });
    res.status(201).json({
      messsage:'Warranty Extended Succesfully',
      data:extend_warranty
    });
  } catch (error) {
    console.error('Error creating extended warranty:', error);
    res.status(500).json({ message: 'Error creating extended warranty',error:error.message });
  }
});

module.exports = router;


