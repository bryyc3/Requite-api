import { type Request, type Response, type NextFunction } from "express";
import { db } from "../db/dbConfig.js";
import { business } from "../db/barrel.js";
import { eq } from "drizzle-orm";

export async function businessStatus(req: Request, res: Response, next: NextFunction){
    const user = req.user.id;
    console.log("business status hit")

    const userBusiness = await db
        .select({
            onboarded: business.onboarded,
        })
        .from(business)
        .where(eq(business.owner_id, user))
        .limit(1);

    if(!userBusiness[0]){
        console.log("User not found")
        return res.status(401).json({code: "Business/user not found"})
    }

    if(!userBusiness[0].onboarded){
        console.log("Onboard")
        return res.status(403).json({code: "Onboarding required"})
    }

    next();
}