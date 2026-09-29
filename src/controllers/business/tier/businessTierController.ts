import { type Request, type Response } from "express";
import { alterTier, createTier, getTierInfo, updateTierActivation } from "../../../services/business/tier/businessTierService.js";
import { randomUUID } from "crypto";

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
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
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

        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
};

export async function createNewTier(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        };

        const tierInfo = {
            ...req.body.tierInfo,
            id: randomUUID()
        };
        

        const newTier = await createTier(businessId, tierInfo);

        res.status(200).json({success: true, tier: newTier.tierInfo});

    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

export async function updateTier(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;
        const tier = req.body.tierInfo;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        };

        const updatedTier = await alterTier(businessId, tier);

        res.status(200).json({success: true, tier: updatedTier.tierInfo});

    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

