import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const films = pgTable("films", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  duration: integer("duration"), // in minutes
  category: text("category").notNull(),
  imageUrl: text("image_url"),
  imageData: text("image_data"), // base64 encoded image data from JSON
  location: text("location"),
  screeningDates: jsonb("screening_dates").$type<string[]>().notNull().default([]),
  director: text("director"),
  year: integer("year"),
  language: text("language"),
  country: text("country"),
  producer: text("producer"),
  runningTime: text("running_time"), // keeping as text since it can be in various formats
  themes: jsonb("themes").$type<string[]>().notNull().default([]),
  pageNumber: integer("page_number"), // to track which PDF page this came from
  createdAt: timestamp("created_at").defaultNow(),
});

export const locations = pgTable("locations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  filmCount: integer("film_count").notNull().default(0),
  dates: jsonb("dates").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scheduleEvents = pgTable("schedule_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  date: text("date").notNull(),
  time: text("time"),
  location: text("location").notNull(),
  type: text("type").notNull(), // 'opening', 'screening', 'discussion', 'closing', etc.
  week: integer("week").notNull(), // 1 or 2
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertFilmSchema = createInsertSchema(films).omit({
  id: true,
  createdAt: true,
});

export const insertLocationSchema = createInsertSchema(locations).omit({
  id: true,
  createdAt: true,
});

export const insertScheduleEventSchema = createInsertSchema(scheduleEvents).omit({
  id: true,
  createdAt: true,
});

export type Film = typeof films.$inferSelect;
export type InsertFilm = z.infer<typeof insertFilmSchema>;
export type Location = typeof locations.$inferSelect;
export type InsertLocation = z.infer<typeof insertLocationSchema>;
export type ScheduleEvent = typeof scheduleEvents.$inferSelect;
export type InsertScheduleEvent = z.infer<typeof insertScheduleEventSchema>;
