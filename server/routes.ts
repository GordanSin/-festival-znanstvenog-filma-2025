import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { filmsQuerySchema, scheduleQuerySchema } from "@shared/schema";
import { log } from "./vite";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all films (with pagination and validation)
  app.get("/api/films", async (req, res) => {
    try {
      const parsed = filmsQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid query parameters",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const { search, category, limit, offset } = parsed.data;

      let result;
      if (search) {
        result = await storage.searchFilms(search, limit, offset);
      } else if (category) {
        result = await storage.getFilmsByCategory(category, limit, offset);
      } else {
        result = await storage.getFilms(limit, offset);
      }

      res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
      res.json({
        data: result.data,
        pagination: {
          total: result.total,
          limit,
          offset,
          hasMore: offset + limit < result.total,
        },
      });
    } catch (error) {
      log(`Error fetching films: ${error}`, "error");
      res.status(500).json({ message: "Failed to fetch films" });
    }
  });

  // Get film by ID
  app.get("/api/films/:id", async (req, res) => {
    try {
      const film = await storage.getFilmById(req.params.id);
      if (!film) {
        return res.status(404).json({ message: "Film not found" });
      }
      res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");
      res.json(film);
    } catch (error) {
      log(`Error fetching film ${req.params.id}: ${error}`, "error");
      res.status(500).json({ message: "Failed to fetch film" });
    }
  });

  // Get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getLocations();
      res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");
      res.json(locations);
    } catch (error) {
      log(`Error fetching locations: ${error}`, "error");
      res.status(500).json({ message: "Failed to fetch locations" });
    }
  });

  // Get location by ID
  app.get("/api/locations/:id", async (req, res) => {
    try {
      const location = await storage.getLocationById(req.params.id);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }
      res.set("Cache-Control", "public, max-age=600, stale-while-revalidate=60");
      res.json(location);
    } catch (error) {
      log(`Error fetching location ${req.params.id}: ${error}`, "error");
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });

  // Get schedule events (with validation)
  app.get("/api/schedule", async (req, res) => {
    try {
      const parsed = scheduleQuerySchema.safeParse(req.query);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid query parameters",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const { week } = parsed.data;

      let events;
      if (week) {
        events = await storage.getScheduleEventsByWeek(week);
      } else {
        events = await storage.getScheduleEvents();
      }

      res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=60");
      res.json(events);
    } catch (error) {
      log(`Error fetching schedule: ${error}`, "error");
      res.status(500).json({ message: "Failed to fetch schedule" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
