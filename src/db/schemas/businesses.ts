import { mysqlTable, varchar} from "drizzle-orm/mysql-core";

export const businesses = mysqlTable("businesses", {
    business_name: varchar("business_name", {length: 255}),
    business_email: varchar("business_email", {length: 255}).notNull(),
    business_owner_email: varchar("business_owner_email", {length: 255}),
    location: varchar("location", {length: 255}),
    business_id: varchar("business_id", {length: 255}).primaryKey()
})