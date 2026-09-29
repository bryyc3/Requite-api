import { type Request, type Response } from "express";
import { getBusinessOverview, storeBusinessInfo, updateTrackingSystem } from "../../../services/business/info/businessInfoService.js";

export async function businessInfo(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(500).json({
                success: false,
                message: "There was no business associated with your request please refresh and try again"
            })
            
        }
        const overview = await getBusinessOverview(owner, businessId);

        res.status(200).json(overview)

    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
    
};

export async function createBusiness(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessInfo = req.body;

        console.log(businessInfo)

        await storeBusinessInfo(owner, businessInfo);

        res.status(200).json({photoPath: "pretend this is photopath"})

    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
    
};

export async function toggleTrackingSystem(req: Request, res: Response){
    try{
        const userId = req.user.id;
        const businessId = req.user.business_id;
        const system = req.body.id;
        const systemActivation = req.body.activated;

        if(!businessId){
            return res.status(500).json({
                success: false,
                message: "There was no business associated with your request please refresh and try again"
            })
            
        }
        
        await updateTrackingSystem(businessId, system, systemActivation);

        res.status(200).json({success: true});

    } catch(error){
        if(error instanceof Error){
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
        
    }
}