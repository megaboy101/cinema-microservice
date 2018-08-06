import { AwilixContainer } from "awilix";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import spdy from "spdy";
import { Booking } from "../api/Booking";

export class Server {
  public static start(container: AwilixContainer): Promise<Server> {
    return new Promise((resolve, reject) => {
      const { port, ssl } = container.resolve("serverSettings");
      const repo = container.resolve("repo");

      if (!repo) {
        reject(new Error("The server must be started with a connected repo"));
      }

      if (!port) {
        reject(new Error("The server must be started on an available port"));
      }

      const app = express();
      app.use(morgan("dev"));
      app.use(bodyParser.json());
      app.use(cors());
      app.use(helmet());

      app.use((req: any, _, next) => {
        req.container = container.createScope();
        next();
      });

      const api = Booking.route.bind(null, { repo });

      api(app);

      if (process.env.NODE === "test") {
        const server = app.listen(port, () => resolve(server));
      } else {
        const server = spdy
          .createServer(ssl, app)
          .listen(port, () => resolve(server));
      }
    });
  }
}
