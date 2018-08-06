import express from "express";
import helmet from "helmet";
import * as http from "http";
import morgan from "morgan";

import { Movies } from "../api/Movies";
import { ServerConfig } from "./ServerConfig";

export class Server {
  public static start(options: ServerConfig): Promise<http.Server> {
    return new Promise((resolve, reject) => {
      if (!options.repo) {
        reject(new Error("Server must have a db to connect"));
      }

      if (!options.port) {
        reject(new Error("Server must have a port to start on"));
      }

      const app = express();

      app.use(morgan("dev"));
      app.use(helmet());

      Movies.route(app, options);

      const server = app.listen(options.port, () => resolve(server));
    });
  }
}
