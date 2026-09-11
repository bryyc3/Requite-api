import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { business } from "./business.js";
import { businessTier } from "./businessTier.js";

export const reward = mysqlTable("Reward", {
    id:  varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", {length: 255}).notNull(),
    cost: int("cost").notNull(),
    tier: varchar("tier", {length: 255}),
    description: varchar("description", {length:255}),
    business_id: varchar("business_id", {length: 255}).references(() => business.id,{onDelete: "set null"})
})

export const rewardRelations = relations(reward, ({ one }) => ({
    business: one(business, {
      fields: [reward.business_id],
      references: [business.id],
    }),

    tier: one(businessTier, {
      fields: [reward.tier],
      references: [businessTier.tier_name]
    })
  }));