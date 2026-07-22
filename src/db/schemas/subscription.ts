import { relations } from "drizzle-orm";
import {varchar, int, mysqlTable } from "drizzle-orm/mysql-core";
import { business } from "./business.js";
import { user } from "./better-auth/user.js";

export const subscription = mysqlTable("Subscription", {
    points_accumulated: int("points_accumulated").notNull(),
    tier: varchar("tier", {length: 255}),
    user_id: varchar("user_id", {length:255}).references(() => user.id),
    business_id: varchar("business_id", {length:255}).references(() => business.id)
})

export const subscriptionRelations = relations(subscription, ({ one }) => ({
    business: one(business, {
      fields: [subscription.business_id],
      references: [business.id],
    }),
    user: one(user, {
        fields: [subscription.user_id],
        references: [user.id],
      }),
  }));