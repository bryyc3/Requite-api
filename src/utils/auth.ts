import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/dbConfig.js";
import * as schema from "../db/barrel.js"

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
    advanced: {
        cookiePrefix: "Requite"
    },
});