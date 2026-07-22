import { relations } from "drizzle-orm";
import { mysqlTable,varchar } from "drizzle-orm/mysql-core";
import { business } from "./business.js";
import { user } from "./better-auth/user.js";

export const redeemedReward = mysqlTable("Redeemed_Reward", {
    user_id: varchar("user_email", {length:255}).references(() => user.id),
    business_id: varchar("business_id", {length:255}).references(() => business.id),
    reward_name: varchar("reward_name", {length: 255}).notNull(),
    redeem_code: varchar("redeem_code", {length: 255}).notNull()
})

export const redeemedRewardRelations = relations(redeemedReward, ({ one }) => ({
    business: one(business, {
      fields: [redeemedReward.business_id],
      references: [business.id],
    }),
    user: one(user, {
        fields: [redeemedReward.user_id],
        references: [user.id],
      }),
  }));