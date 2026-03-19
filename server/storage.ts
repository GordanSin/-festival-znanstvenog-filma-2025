import { type Film, type InsertFilm, type Location, type InsertLocation, type ScheduleEvent, type InsertScheduleEvent, films, locations, scheduleEvents } from "@shared/schema";
import { db } from "./db";
import { eq, or, ilike, sql } from "drizzle-orm";

export interface IStorage {
  // Films
  getFilms(limit?: number, offset?: number): Promise<{ data: Film[]; total: number }>;
  getFilmById(id: string): Promise<Film | undefined>;
  getFilmsByCategory(category: string, limit?: number, offset?: number): Promise<{ data: Film[]; total: number }>;
  searchFilms(query: string, limit?: number, offset?: number): Promise<{ data: Film[]; total: number }>;
  createFilm(film: InsertFilm): Promise<Film>;

  // Locations
  getLocations(): Promise<Location[]>;
  getLocationById(id: string): Promise<Location | undefined>;
  createLocation(location: InsertLocation): Promise<Location>;

  // Schedule
  getScheduleEvents(): Promise<ScheduleEvent[]>;
  getScheduleEventsByWeek(week: number): Promise<ScheduleEvent[]>;
  createScheduleEvent(event: InsertScheduleEvent): Promise<ScheduleEvent>;
}

export class DatabaseStorage implements IStorage {
  // Films
  async getFilms(limit = 50, offset = 0): Promise<{ data: Film[]; total: number }> {
    const [data, countResult] = await Promise.all([
      db.select().from(films).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(films),
    ]);
    return { data, total: countResult[0].count };
  }

  async getFilmById(id: string): Promise<Film | undefined> {
    const [film] = await db.select().from(films).where(eq(films.id, id));
    return film || undefined;
  }

  async getFilmsByCategory(category: string, limit = 50, offset = 0): Promise<{ data: Film[]; total: number }> {
    const condition = eq(films.category, category);
    const [data, countResult] = await Promise.all([
      db.select().from(films).where(condition).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(films).where(condition),
    ]);
    return { data, total: countResult[0].count };
  }

  async searchFilms(query: string, limit = 50, offset = 0): Promise<{ data: Film[]; total: number }> {
    const lowerQuery = `%${query.toLowerCase()}%`;
    const condition = or(
      ilike(films.title, lowerQuery),
      ilike(films.description, lowerQuery),
      ilike(films.director, lowerQuery)
    );
    const [data, countResult] = await Promise.all([
      db.select().from(films).where(condition).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(films).where(condition),
    ]);
    return { data, total: countResult[0].count };
  }

  async createFilm(insertFilm: InsertFilm): Promise<Film> {
    const [film] = await db
      .insert(films)
      .values([insertFilm])
      .returning();
    return film;
  }

  // Locations
  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async getLocationById(id: string): Promise<Location | undefined> {
    const [location] = await db.select().from(locations).where(eq(locations.id, id));
    return location || undefined;
  }

  async createLocation(insertLocation: InsertLocation): Promise<Location> {
    const [location] = await db
      .insert(locations)
      .values([insertLocation])
      .returning();
    return location;
  }

  // Schedule
  async getScheduleEvents(): Promise<ScheduleEvent[]> {
    return await db.select().from(scheduleEvents);
  }

  async getScheduleEventsByWeek(week: number): Promise<ScheduleEvent[]> {
    return await db.select().from(scheduleEvents).where(eq(scheduleEvents.week, week));
  }

  async createScheduleEvent(insertEvent: InsertScheduleEvent): Promise<ScheduleEvent> {
    const [event] = await db
      .insert(scheduleEvents)
      .values([insertEvent])
      .returning();
    return event;
  }
}

export const storage = new DatabaseStorage();
