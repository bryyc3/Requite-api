import { mysqlTable,varchar } from "drizzle-orm/mysql-core";
import { businesses } from "./businesses.js";
import { users } from "./users.js";

export const redeemedRewards = mysqlTable("Redeemed_Rewards", {
    user_email: varchar("user_email", {length:255}).references(() => users.email),
    business_id: varchar("business_id", {length:255}).references(() => businesses.business_id),
    reward_item: varchar("reward_item", {length: 255}).notNull(),
    redeem_code: varchar("redeem_code", {length: 255}).notNull()
})