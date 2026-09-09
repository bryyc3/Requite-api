import type { Business } from "../types/business.types.js";
import { business,businessTier,reward } from "../db/barrel.js";
import { db } from "../db/dbConfig.js";
import { eq, sql } from "drizzle-orm";


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

export async function getTierInfo(businessID: string){
    const tiersActivated = await db
        .select({
            activated: business.tiers_activated
        })
        .from(business)
        .where(eq(business.id, businessID))
        .limit(1);

    if(tiersActivated){
        const tiers = await db
        .select({
            tierName: businessTier.tier_name,
            pointsRequired: businessTier.points_required
        })
        .from(businessTier)
        .where(eq(businessTier.business_id, businessID))

        return{
            activated: tiersActivated[0]?.activated,
            tiers: tiers
        }; 
    }
}

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

export async function updateTierActivation(businessId: string, activationStatus: boolean){
    await db
    .update(business)
    .set({
        tiers_activated: activationStatus
    })
    .where(eq(business.id, businessId))

    if(activationStatus){
        await db.insert(businessTier).values({
            tier_name: "",
            points_required: 0,
            business_id: businessId
        })

        return getTierInfo
    }

    if(!activationStatus){
        await db
            .delete(businessTier)
            .where(eq(businessTier.business_id, businessId))
    }
}