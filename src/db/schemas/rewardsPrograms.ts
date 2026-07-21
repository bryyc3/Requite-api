import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { businesses } from "./businesses.js";

export const rewardsPrograms = mysqlTable("Rewards_Programs", {
    reward_item: varchar("reward_item", {length: 255}).primaryKey(),
    reward_cost: int("reward_cost").notNull(),
    reward_tier: varchar("reward_tier", {length: 255}),
    business_id: varchar("business_id", {length: 255}).references(() => businesses.business_id)
})