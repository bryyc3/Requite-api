import type { Business } from "../types/business.types.js";
import { business } from "../db/barrel.js";
import { db } from "../db/dbConfig.js";
import { eq } from "drizzle-orm";

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