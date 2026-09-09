import { relations } from "drizzle-orm";
import { mysqlTable,varchar, int } from "drizzle-orm/mysql-core";
import { business } from "./business.js";
import { reward } from "./reward.js";

export const businessTier = mysqlTable("Business_Tier", {
    business_id: varchar("business_id", {length:255}).references(() => business.id),
    points_required: int("points_required").default(0).notNull(),
    tier_name: varchar("tier_name", {length:255})
})

export const businessTierRelations = relations(businessTier, ({ one, many }) => ({
    business: one(business, {
      fields: [businessTier.business_id],
      references: [business.id],
    }),

    reward: many(reward)
  }));