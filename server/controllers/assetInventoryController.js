const {Asset} = require('../models/AssetInventory');

const createAsset = async (req,res)=>{
    console.log(req.body);

    const {
         Asset_Id, Employee_Id, Serial_Number, Category, Brand, Model, Purchased_From, 
         Purchased_Date, Warranty_Start_Date, Warranty_End_Date, Warranty_Extendable, 
         Asset_Price, Asset_Images
          } = req.body

    try{
        const assets = await Asset.create({
                Asset_Id,
                Employee_Id,
                Serial_Number,  
                Category,
                Brand,
                Model,
                Purchased_From,
                Purchased_Date,
                Warranty_Start_Date,
                Warranty_End_Date,
                Warranty_Extendable,
                Asset_Price,
                Asset_Images
        });

        res.status(201).json({
            success:true,
            result:assets
        });

    }

    catch(error){
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
}

const getAllAssets = async (req,res)=>{
  
     
       try{
          const assets = await Asset.findAll();
          res.status(200).json({
            success:true,
            result:assets
          })
            
       }

        catch(error){
        console.log("Error in getting all assets",error)
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
       
}

const updateAsset = async(req,res)=>{
     
    const { Asset_Id } = req.params; 
    const updatedData = req.body;

    try{
        const asset = await Asset.findOne({where:{Asset_Id}});

        if(!asset){
            return res.status(404).json({
                success:false,
                message:`Asset with ID ${Asset_Id} not found.`
            });
        }

        await Asset.update(updatedData, {
            where: { Asset_Id }
        })

        const updatedAsset = await Asset.findOne({
            where:{Asset_Id}
        });

        res.status(200).json({
            success:true,
            message: "Asset Updated Successfully",
            result: updatedAsset
        });
    }

    catch(error){
        console.log("Error in updating asset",error);
        res.status(500).json({
            success:false,
            error:error.message
        });
    }
}


const deleteAsset = async(req,res)=>{
    const {Asset_Id} = req.params;

    try{
        const asset = await Asset.findOne({where:{Asset_Id}});

        if(!asset){
            return res.status(404).json({
                success: false,
                error:error.message,
                message: `Asset with Id ${Asset_Id} not found`
            });
        }

        await Asset.destroy({
            where:{Asset_Id}
        });

        res.status(200).json({
            success:true,
            message:`Asset with Id ${Asset_Id} soft deleted Successfully`,
            result: asset
        });
    }

    catch(error){
        console.error("Error in soft deleting asset",error);

        res.status(500).json({
            success:false,
            error:error.message
        });
    }

}

module.exports={
    createAsset,
    getAllAssets,
    updateAsset,
    deleteAsset
}
   
  