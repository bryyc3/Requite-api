import { relations } from "drizzle-orm";
import {
    mysqlTable,
    varchar,
    text,
    timestamp,
    boolean
  } from "drizzle-orm/mysql-core";
  import { session } from "./session.js";
  import { account } from "./account.js";
  import { business } from "../business.js";

export const user = mysqlTable("user", {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at", { fsp: 3 }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { fsp: 3 })
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  });

  export const userRelations = relations(user, ({ many }) => ({
    sessions: many(session),
    accounts: many(account),
    businesses: many(business),
  }));