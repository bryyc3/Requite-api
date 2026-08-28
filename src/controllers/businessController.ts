import { type Request, type Response } from "express";
import { storeBusinessInfo, getBusinessOverview} from "../services/businessService.js";

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
        console.log("business info error", error)
    }
    
};

export async function businessTiers(req: Request, res: Response){
    console.log("tiers hit")
    res.status(200);
};

export async function businessTrackingSystem(req: Request, res: Response){

};

export async function businessRewards(req: Request, res: Response){

};

export async function createBusiness(req: Request, res: Response){
    try{
        const owner = req.user.id;
        const businessInfo = req.body;

        await storeBusinessInfo(owner, businessInfo);

        res.status(200).json({photoPath: "pretend this is photopath"})

    } catch(error){
        console.log("business creation error", error)
    }
    
};