import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/dbConfig.js";
import * as schema from "../db/barrel.js";
import { business } from "../db/barrel.js";
import { randomUUID } from "crypto";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        'http://localhost:3000'
    ],
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_WEB_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }
    },
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema
    }),    
    databaseHooks:{
        user:{
            create:{
                after: async (user) => {
                    try{
                        await db.insert(business).values({
                            id: randomUUID(),
                            business_owner_email: user.email,
                            owner_id: user.id
                        })
                    } catch(error){
                        console.error("Failed to create business", error);
                    }
                },
            }
        }
    },
    advanced: {
        cookiePrefix: "Requite"
    },
});