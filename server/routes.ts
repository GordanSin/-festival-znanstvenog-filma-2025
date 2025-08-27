import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all films
  app.get("/api/films", async (req, res) => {
    try {
      const { category, search } = req.query;
      
      let films;
      if (search && typeof search === 'string') {
        films = await storage.searchFilms(search);
      } else if (category && typeof category === 'string') {
        films = await storage.getFilmsByCategory(category);
      } else {
        films = await storage.getFilms();
      }
      
      res.json(films);
    } catch (error) {
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
      res.json(film);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch film" });
    }
  });

  // Get all locations
  app.get("/api/locations", async (req, res) => {
    try {
      const locations = await storage.getLocations();
      res.json(locations);
    } catch (error) {
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
      res.json(location);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch location" });
    }
  });

  // Get schedule events
  app.get("/api/schedule", async (req, res) => {
    try {
      const { week } = req.query;
      
      let events;
      if (week && typeof week === 'string') {
        events = await storage.getScheduleEventsByWeek(parseInt(week));
      } else {
        events = await storage.getScheduleEvents();
      }
      
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch schedule" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
