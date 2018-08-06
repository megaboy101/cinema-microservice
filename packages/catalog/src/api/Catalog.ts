import * as express from "express";
import status from "http-status";

import { ServerConfig } from "../server/ServerConfig";

export class Catalog {
  public static route(app: express.Express, options: ServerConfig): void {
    const { repo } = options;

    if (!repo) {
      throw new Error("Repository connection required");
    }

    app.get("/cinemas", (req, res, next) => {
      repo
        .cinemaByCity(req.query.cityId)
        .then((cinemas) => {
          res.status(status.OK).json(cinemas);
        })
        .catch(next);
    });

    app.get("/cinemas/:cinemaId", (req, res, next) => {
      repo
        .cinemaById(req.params.cinemaId)
        .then((cinema) => {
          res.status(status.OK).json(cinema);
        })
        .catch(next);
    });

    app.get("/cinemas/:cityId/:movieId", (req, res, next) => {
      const cityId: string = req.params.cityId;
      const movieId: string = req.params.cityId;

      repo
        .cinemaScheduleByMovie({ cityId, movieId })
        .then((schedules) => {
          res.status(status.OK).json(schedules);
        })
        .catch(next);
    });
  }
}
