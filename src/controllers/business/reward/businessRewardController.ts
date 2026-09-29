import { type Request, type Response } from "express";
import { alterReward, getRewards, removeReward, storeReward } from "../../../services/business/reward/businessRewardService.js";
import { randomUUID } from "crypto";
import { reward } from "../../../db/barrel.js";


export async function businessRewards(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        }

        const rewards = await getRewards(businessId);

        res.status(200).json(rewards);

    } catch(error){
        
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
};

export async function createReward(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        }

        const rewardInfo = {
            ...req.body.reward,
            id: randomUUID()
        };
        
        const rewardCreated = await storeReward(businessId, rewardInfo);

        res.status(200).json(rewardCreated.rewardInfo)

    } catch(error){
        if(error instanceof Error){
            return res.status(400).json({
                message: error.message
            })
        }

        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

export async function updateReward(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;
        const rewardInfo = req.body.reward;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        };

        const updatedReward = await alterReward(businessId, rewardInfo);

        res.status(200).json(updatedReward.rewardInfo)

    } catch(error){
        return res.status(400).json({
            success: false,
            message: "Something went wrong, please try again"
        })
    }
}

export async function deleteReward(req: Request, res: Response){
    try{
        const businessId = req.user.business_id;
        const rewardId = req.body.reward;

        if(!businessId){
            return res.status(403).json({
                message: "No business ID"
            })
        }

        await removeReward(businessId, rewardId);

        res.status(200).json(rewardId)

    } catch(error){
        if(error instanceof Error){
            return res.status(400).json({
                message: error.message
            })
        }

        return res.status(400).json({
            message: "Something went wrong, please try again"
        })
    }

}