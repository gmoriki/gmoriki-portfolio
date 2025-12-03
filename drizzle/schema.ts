import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Works table for storing portfolio items
 */
export const works = mysqlTable("works", {
  id: int("id").autoincrement().primaryKey(),
  year: varchar("year", { length: 10 }).notNull(), // e.g., "2023年"
  date: varchar("date", { length: 100 }).notNull(), // e.g., "2023年12月6-7日"
  title: text("title").notNull(),
  description: text("description").notNull(),
  organization: text("organization"), // Optional
  link: text("link"), // Optional
  image: text("image"), // Optional
  tags: text("tags").notNull(), // JSON array stored as text, e.g., '["研修","講演"]'
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Work = typeof works.$inferSelect;
export type InsertWork = typeof works.$inferInsert;