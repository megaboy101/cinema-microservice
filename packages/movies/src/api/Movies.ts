import * as express from "express";
import * as status from "http-status";
import { ServerConfig } from "../server/ServerConfig";

export class Movies {
  public static route(app: express.Express, options: ServerConfig): void {
    const { repo } = options;

    if (!repo) {
      throw new Error("Repository connection required");
    }

    app.get("/movies", (_: express.Request, res: express.Response, next: express.NextFunction) => {
      repo
        .fetchMovies()
        .then((movies) => {
          res.status(status.OK).json(movies);
        })
        .catch(next);
    });

    app.get("/movies/premieres", (_: express.Request, res: express.Response, next: express.NextFunction) => {
      repo
        .fetchPremiers()
        .then((movies) => {
          res.status(status.OK).json(movies);
        })
        .catch(next);
    });

    app.get("/movies/:id", (req: express.Request, res: express.Response, next: express.NextFunction) => {
      repo
        .movieById(req.params.id)
        .then((movie) => {
          res.status(status.OK).json(movie);
        })
        .catch(next);
    });
  }
}
