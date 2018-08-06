import express from "express";
import helmet from "helmet";
import * as http from "http";
import morgan from "morgan";
import spdy from "spdy";

import { Movies } from "../api/Movies";
import { ServerConfig } from "./ServerConfig";

export class Server {
  public static start(options: ServerConfig): Promise<spdy.Server> {
    return new Promise((resolve, reject) => {
      if (!options.repo) {
        reject(new Error("Server must have a db to connect"));
      } else if (!options.port) {
        reject(new Error("Server must have a port to start on"));
      } else if (!options.ssl) {
        reject(new Error("Server must have an ssl certificate to start"));
      } else {
        const app = express();

        app.use(morgan("dev"));
        app.use(helmet());

        Movies.route(app, options);

        const server = spdy.createServer(options.ssl, app);

        server.listen(options.port, () => resolve(server));
      }
    });
  }
}
