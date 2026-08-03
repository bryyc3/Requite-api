import { type Request, type Response, type NextFunction } from "express";
import { auth } from "../utils/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export async function authStatus(req: Request, res: Response, next: NextFunction){
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    });
    
    if(!session){
       return res.status(401).json({ error: "Unauthorized"});
    };

    return res.json(session);
}