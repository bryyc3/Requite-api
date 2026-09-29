import { business, reward }  from "../../../db/barrel.js";
import { db } from "../../../db/dbConfig.js";
import { and, eq } from "drizzle-orm";
import { getTierInfo } from "../tier/businessTierService.js";
import type { Reward } from "../../../types/business.types.js";

export async function getRewards(businessId: string){

    const businessTiers = await getTierInfo(businessId);

    const businessRewards = await db
        .select({
            id: reward.id,
            name: reward.name,
            description: reward.description,
            cost: reward.cost,
            tier: reward.tier
        })
        .from(reward)
        .where(eq(reward.business_id, businessId))

    if(!businessRewards){
        return{
            rewards: []
        }
    }

    return{
        rewards: businessRewards,
        tiers: businessTiers
    };
}

export async function storeReward(businessId: string, rewardInfo: Reward){
    const [matchingReward] = await db
        .select({
            normalized_name: reward.normalized_name
        })
        .from(reward)
        .where(and(
                eq(reward.business_id, businessId),
                eq(reward.normalized_name, rewardInfo.name.trim())
        ))
        if(matchingReward){
            throw new Error("Cannot create another reward with the same name");
        }

    await db
        .insert(reward)
        .values({
            id: rewardInfo.id,
            name: rewardInfo.name,
            normalized_name: rewardInfo.name.trim(),
            cost: rewardInfo.cost,
            description: rewardInfo.description,
            business_id: businessId
        });

    return {
        rewardInfo
    }
}

export async function alterReward(businessId: string, rewardInfo: Reward){
   await db
    .update(reward)
    .set({
        name: rewardInfo.name,
        description: rewardInfo.description,
        cost: rewardInfo.cost,
        tier: rewardInfo.tier
    })
    .where(and(
        eq(reward.business_id, businessId),
        eq(reward.id, rewardInfo.id))
    );

    return{
        rewardInfo
    }
}

export async function removeReward(businessId: string, rewardId: string){
    const createdReward = await db
        .select({rewardName: reward.name})
        .from(reward)
        .where(eq(reward.business_id, businessId))
        .limit(2);
    
    if(createdReward.length == 1){
        throw new Error("At least one reward must be created");
    }
    
    await db
    .delete(reward)
    .where(and(
            eq(reward.business_id, businessId),
            eq(reward.id, rewardId))
    )
}