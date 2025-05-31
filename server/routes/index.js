
const express = require('express');
const router = express.Router();



// Controllers

const{register,getAllEmployees}=require('../controllers/EmployeeCredentialsController');
const{createAsset,getAllAssets,updateAsset,deleteAsset}=require('../controllers/assetInventoryController');
const{createExtension,getAllExtensions}=require('../controllers/warrantyExtensionsController');
const{getAllHistory}=require('../controllers/warrantyHistoryController');



// Employee Credentials Routes

// Create a new employee    
router.post('/user',register);

// Get all employees
router.get('/user',getAllEmployees);



// Asset Inventory Routes

// Create a new asset
router.post('/asset',createAsset);

// Get all assets
router.get('/asset',getAllAssets);

// Update an asset by Asset_Id
router.put('/asset/:Asset_Id',updateAsset);

// Delete an asset by Asset_Id
router.delete('/asset/:Asset_Id',deleteAsset);



// Warranty Extensions Routes

// Create a new extension
router.post('/extension',createExtension);

// Get all extensions
router.get('/extension',getAllExtensions);



// Warranty History Routes

// Get all history
router.get('/history',getAllHistory);



module.exports = router;
