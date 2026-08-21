import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { db } from "../db/dbConfig.js";
import { business } from "../db/barrel.js";
import { eq } from "drizzle-orm";

export async function authStatus(req: Request, res: Response, next: NextFunction){
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });

    if(!session){
        console.log("Unauth")
       return res.status(401).json({ code: "Unauthorized"});
    };

    const userBusiness = await db
        .select({
            onboarded: business.onboarded,
        })
        .from(business)
        .where(eq(business.owner_id, session.user.id))
        .limit(1);

    if(!userBusiness[0]){
        console.log("User not found")
        return res.status(404).json({code: "Business/user not found"})
    }

    if(!userBusiness[0].onboarded){
        console.log("Onboard")
        return res.status(403).json({code: "Onboarding required"})
    }

    return res.json(session);
}