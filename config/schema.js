
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  email: text("email").notNull().unique()
})

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  color: text("color"),
  is_favourite: integer('is_favorite').notNull().default(0),
  created_at: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
})

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content").notNull(),
  description: text("description"),
  is_completed: integer("is_completed").default(0),
  created_at: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" })
})

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  task_id: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  project_id: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  posted_at: text("posted_at").default(sql`CURRENT_TIMESTAMP`)
})


