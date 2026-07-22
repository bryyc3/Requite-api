import { relations } from "drizzle-orm";
import { mysqlTable, varchar} from "drizzle-orm/mysql-core";
import { user } from "./better-auth/user.js";
import { subscription } from "./subscription.js";
import { redeemedReward } from "./redeemedReward.js";
import { reward } from "./reward.js";

export const business = mysqlTable("business", {
    id:  varchar("id", { length: 36 }).primaryKey(),
    business_name: varchar("business_name", {length: 255}),
    business_owner_email: varchar("business_owner_email", {length: 255}),
    location: varchar("location", {length: 255}),
    owner_id: varchar("business_id", {length: 255}).notNull().references(() => user.id, { onDelete: "cascade" }),
})

export const businessesRelations = relations(business, ({ one, many }) => ({
    user: one(user, {
      fields: [business.owner_id],
      references: [user.id],
    }),
    subscriptions: many(subscription),
    redeemedRewards: many(redeemedReward),
    rewardsPrograms: many(reward),
    
}));