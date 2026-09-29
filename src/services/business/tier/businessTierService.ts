import { business,businessTier,reward }  from "../../../db/barrel.js";
import { db } from "../../../db/dbConfig.js";
import { and, eq } from "drizzle-orm";
import type { Reward, Tier } from "../../../types/business.types.js";

export async function getTierInfo(businessID: string){
    const [tiersActivated] = await db
        .select({
            activated: business.tiers_activated
        })
        .from(business)
        .where(eq(business.id, businessID))
        .limit(1);

    if(tiersActivated?.activated){
        const allTiers: Tier[] = await db
        .select({
            id: businessTier.id,
            name: businessTier.tier_name,
            points: businessTier.points_required
        })
        .from(businessTier)
        .where(eq(businessTier.business_id, businessID))

        if(allTiers.length == 0){
            return{
                activated: tiersActivated.activated,
                tiers: [{
                    name: "",
                    points: 0
                }]
            };
        }

        const rewards: Reward[] = await db
            .select({
                id: reward.id,
                name: reward.name,
                cost: reward.cost
            })
            .from(reward)
            .where(eq(reward.business_id, businessID))

        const rewardsByTier = rewards.reduce<Record<string, Reward[]>>((groups, reward) =>{
            if(reward.tier === undefined){
                return groups;
            }

            const tierRewards = groups[reward.tier];

            if(tierRewards){
                tierRewards.push(reward)
            }else{
                groups[reward.tier] = [reward];
            }

            return groups;
        }, {})

        return{
            activated: tiersActivated.activated,
            tiers: allTiers.map(tier =>({
                ...tier,
                exclusiveRewards: rewardsByTier[tier.id] ?? []
            }))
        }; 
    } else {
        return{
            activated: tiersActivated!.activated,
            tiers: [{
                name: "",
                points: 0
            }]
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

    if(!activationStatus){
        await db
        .delete(businessTier)
        .where(eq(businessTier.business_id, businessId))
    } 

    return{
        activated: activationStatus,
        tiers: [{
            name: "",
            points: 0
        }]
    }
}

export async function createTier(businessId: string, tierInfo: Tier){
    const [matchingTier] = await db
        .select({
            normalized_name: businessTier.normalized_name
        })
        .from(businessTier)
        .where(and(
                eq(businessTier.business_id, businessId),
                eq(businessTier.normalized_name, tierInfo.name.trim())
        ))

        if(matchingTier){
            throw new Error("Theres already a tier with this name");
        };

    if(tierInfo.exclusiveRewards){
        tierInfo.exclusiveRewards.map(async (rewardInfo) => (
            await db
            .update(reward)
            .set({
                tier: tierInfo.id
            })
            .where(and(
                eq(reward.business_id, businessId),
                eq(reward.id, rewardInfo.id))
            )
        ))
    };

    await db
        .insert(businessTier)
        .values({
            id: tierInfo.id,
            tier_name: tierInfo.name,
            points_required: tierInfo.points,
            business_id: businessId,
            normalized_name: tierInfo.name.trim()
        })
    return{
        tierInfo
    }
};

export async function alterTier(businessId: string, tierInfo: Tier){
    await db
    .update(businessTier)
    .set({
        tier_name: tierInfo.name,
        points_required: tierInfo.points,
    })
    .where(and(
        eq(businessTier.business_id, businessId),
        eq(businessTier.id, tierInfo.id))
    );
    if(tierInfo.exclusiveRewards){
        tierInfo.exclusiveRewards.map(async (rewardInfo) => (
            await db
            .update(reward)
            .set({
                tier: tierInfo.id
            })
            .where(and(
                eq(reward.business_id, businessId),
                eq(reward.id, rewardInfo.id))
            )
        ))
    }

    return{
        tierInfo
    }
}