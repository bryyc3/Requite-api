import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { businesses } from "./businesses.js";
import { users } from "./users.js";

export const trackedPurchases = mysqlTable("Tracked_Purchases",{
    user_email: varchar("user_email", {length: 255}).references(() => users.email),
    item: varchar("item", {length: 255}).notNull(),
    business_id: varchar("business_id", {length: 255}).references(() => businesses.business_id)
})