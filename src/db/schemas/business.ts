import { relations } from "drizzle-orm";
import { boolean, mysqlTable, varchar} from "drizzle-orm/mysql-core";
import { user } from "./better-auth/user.js";
import { subscription } from "./subscription.js";
import { redeemedReward } from "./redeemedReward.js";
import { reward } from "./reward.js";

export const business = mysqlTable("business", {
    id:  varchar("id", { length: 36 }).primaryKey(),
    business_name: varchar("business_name", {length: 255}),
    business_owner_email: varchar("business_owner_email", {length: 255}).notNull().references(() => user.email, { onDelete: "cascade" }),
    location: varchar("location", {length: 255}),
    owner_id: varchar("business_id", {length: 255}).notNull().references(() => user.id, { onDelete: "cascade" }),
    onboarded: boolean("onboarded").default(false).notNull(),
    reward_tracker: varchar("reward_tracker", {length:255})
})

export const businessesRelations = relations(business, ({ one, many }) => ({
    user: one(user, {
      fields: [business.owner_id, business.business_owner_email],
      references: [user.id, user.email],
    }),
    subscriptions: many(subscription),
    redeemedRewards: many(redeemedReward),
    rewardsPrograms: many(reward),
    
}));