import { business,businessTier,reward }  from "../../../db/barrel.js";
import { db } from "../../../db/dbConfig.js";
import { eq } from "drizzle-orm";

export async function getTierInfo(businessID: string){
    const [tiersActivated] = await db
        .select({
            activated: business.tiers_activated
        })
        .from(business)
        .where(eq(business.id, businessID))
        .limit(1);

    if(tiersActivated?.activated){
        const tiers = await db
        .select({
            tierName: businessTier.tier_name,
            pointsRequired: businessTier.points_required
        })
        .from(businessTier)
        .where(eq(businessTier.business_id, businessID))

        return{
            activated: tiersActivated.activated,
            tiers: tiers
        }; 
    } else {
        return{
            tiersActivated: tiersActivated?.activated,
            tiers: []
        }
    }
}

export async function updateTierActivation(businessId: string, activationStatus: boolean){
    await db
    .update(business)
    .set({
        tiers_activated: activationStatus
    })
    .where(eq(business.id, businessId))

    if(activationStatus){
       const [tierActivated] = await db
        .insert(businessTier)
        .values({
            tier_name: "",
            points_required: 0,
            business_id: businessId
        })
    }

    if(!activationStatus){
        await db
        .delete(businessTier)
        .where(eq(businessTier.business_id, businessId))
    }
}