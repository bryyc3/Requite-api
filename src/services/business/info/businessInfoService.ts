import type { Business } from "../../../types/business.types.js";
import { business,businessTier,reward }  from "../../../db/barrel.js";
import { db } from "../../../db/dbConfig.js";
import { eq } from "drizzle-orm";

export async function getBusinessOverview(ownerId: string, businessId: string){
    const [businessInfo] = await db
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
        businessName: businessInfo?.businessName,
        businessLocation: businessInfo?.businessLocation,
        trackingSystems:{
            point_tracker: businessInfo?.pointTracker,
            visit_tracker: businessInfo?.visitTracker,
            referral_tracker: businessInfo?.referralTracker,
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
    if(!activationStatus){
        const [trackingSystemInfo] = await db
        .select({
            pointTracker: business.point_tracker,
            visitTracker: business.visit_tracker,
            referralTracker: business.referral_tracker,
        })
        .from(business)
        .where(eq(business.id, businessId))
        .limit(1);
        
        const remainingSystems ={
            pointTracker: 
                trackingType !== "point_tracker" && trackingSystemInfo?.pointTracker,
                
            visitTracker: 
                trackingType !== "visit_tracker" && trackingSystemInfo?.visitTracker,

            referralTracker: 
                trackingType !== "referral_tracker" && trackingSystemInfo?.referralTracker,
        }

        if(!Object.values(remainingSystems).some(Boolean)){
            throw new Error("At least one tracking system must be enabled");
        }
    };

    await db
    .update(business)
    .set({
        [trackingType]: activationStatus
    })
    .where(eq(business.id, businessId))
}