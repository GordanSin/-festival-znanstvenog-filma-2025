import { type Film, type InsertFilm, type Location, type InsertLocation, type ScheduleEvent, type InsertScheduleEvent, films, locations, scheduleEvents } from "@shared/schema";
import { db } from "./db";
import { eq, like, or, ilike } from "drizzle-orm";

export interface IStorage {
  // Films
  getFilms(): Promise<Film[]>;
  getFilmById(id: string): Promise<Film | undefined>;
  getFilmsByCategory(category: string): Promise<Film[]>;
  searchFilms(query: string): Promise<Film[]>;
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
  async getFilms(): Promise<Film[]> {
    return await db.select().from(films);
  }

  async getFilmById(id: string): Promise<Film | undefined> {
    const [film] = await db.select().from(films).where(eq(films.id, id));
    return film || undefined;
  }

  async getFilmsByCategory(category: string): Promise<Film[]> {
    return await db.select().from(films).where(eq(films.category, category));
  }

  async searchFilms(query: string): Promise<Film[]> {
    const lowerQuery = `%${query.toLowerCase()}%`;
    return await db.select().from(films).where(
      or(
        ilike(films.title, lowerQuery),
        ilike(films.description, lowerQuery),
        ilike(films.director, lowerQuery)
      )
    );
  }

  async createFilm(insertFilm: InsertFilm): Promise<Film> {
    const [film] = await db
      .insert(films)
      .values(insertFilm)
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
      .values(insertLocation)
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
      .values(insertEvent)
      .returning();
    return event;
  }
}

export const storage = new DatabaseStorage();