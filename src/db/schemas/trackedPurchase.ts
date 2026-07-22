import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { business } from "./business.js";
import { user } from "./better-auth/user.js";

export const trackedPurchase = mysqlTable("Tracked_Purchase",{
    user_id: varchar("user_id", {length: 255}).references(() => user.id),
    item: varchar("item", {length: 255}).notNull(),
    business_id: varchar("business_id", {length: 255}).references(() => business.id)
})

export const trackedPurchaseRelations = relations(trackedPurchase, ({ one }) => ({
    business: one(business, {
      fields: [trackedPurchase.business_id],
      references: [business.id],
    }),
    user: one(user, {
      fields: [trackedPurchase.user_id],
      references: [user.id],
    }),
  }));