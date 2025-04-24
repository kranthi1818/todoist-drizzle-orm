
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  color: text("color").notNull(),
  is_favorite: integer("is_favourite").default(0),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  description: text("description").notNull(),
  due_date: text("due_date"),
  is_completed: integer("is_completed").default(0),
  created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  task_id: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
});

