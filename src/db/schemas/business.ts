import { relations } from "drizzle-orm";
import { boolean, int, mysqlTable, varchar} from "drizzle-orm/mysql-core";
import { user } from "./better-auth/user.js";
import { subscription } from "./subscription.js";
import { redeemedReward } from "./redeemedReward.js";
import { reward } from "./reward.js";
import { businessTier } from "./businessTier.js";

export const business = mysqlTable("business", {
    id:  varchar("id", { length: 36 }).primaryKey(),
    business_name: varchar("business_name", {length: 255}),
    business_owner_email: varchar("business_owner_email", {length: 255}).notNull().references(() => user.email, { onDelete: "cascade" }),
    location: varchar("location", {length: 255}),
    owner_id: varchar("business_id", {length: 255}).notNull().references(() => user.id, { onDelete: "cascade" }),
    onboarded: boolean("onboarded").default(false).notNull(),
    point_tracker: boolean("point_tracker").default(false).notNull(),
    visit_tracker: boolean("visit_tracker").default(false).notNull(),
    referral_tracker: boolean("referral_tracker").default(false).notNull(),
    ppd: int('ppd').default(0).notNull(),
    tiers_activated: boolean("tiers_activated").default(false).notNull()
})

export const businessesRelations = relations(business, ({ one, many }) => ({
    user: one(user, {
      fields: [business.owner_id, business.business_owner_email],
      references: [user.id, user.email],
    }),
    subscription: many(subscription),
    redeemedReward: many(redeemedReward),
    reward: many(reward),
    businessTier: many(businessTier)
}));