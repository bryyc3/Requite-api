import type { Business } from "../types/business.types.js";
import { business,reward } from "../db/barrel.js";
import { db } from "../db/dbConfig.js";
import { eq } from "drizzle-orm";


export async function getBusinessOverview(ownerId: string, businessId: string){
    const businessInfo = await db
        .select({
            businessName: business.business_name,
            businessLocation: business.location,
            rewardTracker: business.reward_tracker
        })
        .from(business)
        .where(eq(business.owner_id, ownerId))
        .limit(1);
    const createdReward = await db
        .select({rewardName: reward.name})
        .from(reward)
        .where(eq(reward.business_id, businessId))
        .limit(1);

    return{
        businessName: businessInfo[0]?.businessName,
        businessLocation: businessInfo[0]?.businessLocation,
        rewardTracker: businessInfo[0]?.rewardTracker,
        rewardCreated: createdReward.length > 0,
    };
};

export async function storeBusinessInfo(ownerId: string, info: Business){
    const businessCreated = await db
        .update(business)
        .set({
            business_name: info.name,
            location: info.location,
            onboarded: true
        })
        .where(eq(business.owner_id, ownerId))
        
}