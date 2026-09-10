import type { Business } from "../../../types/business.types.js";
import { business,businessTier,reward }  from "../../../db/barrel.js";
import { db } from "../../../db/dbConfig.js";
import { eq } from "drizzle-orm";

export async function getBusinessOverview(ownerId: string, businessId: string){
    const businessInfo = await db
        .select({
            businessName: business.business_name,
            businessLocation: business.location,
            pointTracker: business.point_tracker,
            visitTracker: business.visit_tracker,
            referralTracker: business.referral_tracker,
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
        trackingSystems:{
            point_tracker: businessInfo[0]?.pointTracker,
            visit_tracker: businessInfo[0]?.visitTracker,
            referral_tracker: businessInfo[0]?.referralTracker,
        },
        rewardCreated: createdReward.length > 0,
    };
};

export async function storeBusinessInfo(ownerId: string, info: Business){
    await db
    .update(business)
    .set({
        business_name: info.name,
        location: info.location,
        onboarded: true
    })
    .where(eq(business.owner_id, ownerId))
    
}

export async function updateTrackingSystem(businessId: string, trackingType: string, activationStatus: boolean){
    await db
    .update(business)
    .set({
        [trackingType]: activationStatus
    })
    .where(eq(business.id, businessId))
}