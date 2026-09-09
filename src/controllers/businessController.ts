import { type Request, type Response } from "express";
import { storeBusinessInfo, getBusinessOverview, updateTrackingSystem, getTierInfo, updateTierActivation} from "../services/businessService.js";

//////////////////////////GET FUNCTIONS////////////////////////////////
export async function businessInfo(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        }
        const overview = await getBusinessOverview(owner, businessId);

        res.status(200).json(overview)

    } catch(error){
        res.status(500).json({success: false});
        console.log("business info error", error)
    }
    
};

export async function tiers(req: Request, res: Response){
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


export async function businessRewards(req: Request, res: Response){

};
//////////////////////////GET FUNCTIONS////////////////////////////////



//////////////////////////POST FUNCTIONS////////////////////////////////
export async function createBusiness(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessInfo = req.body;

        await storeBusinessInfo(owner, businessInfo);

        res.status(200).json({photoPath: "pretend this is photopath"})

    } catch(error){
        res.status(500).json({success: false});
        console.log("business creation error", error)
    }
    
};

export async function toggleTrackingSystem(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;
        const system = req.body.id;
        const systemActivation = req.body.activated;

        if(!businessId){
            res.status(500).json({success: false})
            return
        }

        await updateTrackingSystem(businessId, system, systemActivation);

        res.status(200).json({success: true});

    } catch(error){
        res.status(500).json({success: false});
        console.log("activate tracking system error", error);
        
    }
}

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
//////////////////////////POST FUNCTIONS////////////////////////////////