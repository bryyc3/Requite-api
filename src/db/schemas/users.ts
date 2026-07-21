import { mysqlTable, varchar, tinyint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    email: varchar("email", {length: 255}).primaryKey(),
    reward_tracker: tinyint("reward_tracker").notNull(),
    tracking_preference: varchar("tracking_preference", {length:255})
})