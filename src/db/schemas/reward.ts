import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { business } from "./business.js";

export const reward = mysqlTable("Reward", {
    name: varchar("name", {length: 255}).notNull(),
    cost: int("cost").notNull(),
    tier: varchar("tier", {length: 255}),
    business_id: varchar("business_id", {length: 255}).references(() => business.id)
})

export const rewardRelations = relations(reward, ({ one }) => ({
    business: one(business, {
      fields: [reward.business_id],
      references: [business.id],
    }),
  }));