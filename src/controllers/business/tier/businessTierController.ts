import { type Request, type Response } from "express";
import { getTierInfo, updateTierActivation } from "../../../services/business/tier/businessTierService.js";

export async function businessTiers(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        }
        const tierInfo = await getTierInfo(businessId);

        res.status(200).json(tierInfo);

    } catch(error){
        res.status(500).json({success: false});
        console.log("tiers error", error)
    }
    
};

export async function toggleTiers(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;
        const systemActivation = req.body.activated;

        if(!businessId){
            res.status(500).json({success: false})
            return
        }

        const tierInfo = await updateTierActivation(businessId, systemActivation);

        res.status(200).json({success: true, tierInfo});

    } catch(error){
        res.status(500).json({success: false});
        console.log("activate tracking system error", error);
        
    }
}