import {varchar, int, mysqlTable } from "drizzle-orm/mysql-core";
import { users } from "./users.js";
import { businesses } from "./businesses.js";

export const programSubscriptions = mysqlTable("Program_Subscriptions", {
    points_accumulalted: int("points_accumulated").notNull(),
    tier: varchar("tier", {length: 255}),
    user_email: varchar("user_email", {length:255}).references(() => users.email),
    business_id: varchar("business_id", {length:255}).references(() => businesses.business_id)
})