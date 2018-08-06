import { EventEmitter } from "events";
import { MongoClient } from "mongodb";

import { dbSettings, serverSettings } from "./config/config";
import { Mongo } from "./config/Mongo";
import { Repository } from "./repository/Repository";
import { Server } from "./server/Server";

const mediator = new EventEmitter();

console.log("--- Movies Service ---");
console.log("Connecting to movies repository");

process.on("uncaughtException", (err: Error) => (
  console.error("Unhandled Exception", err)
));

process.on("unhandledRejection", (err: Error) => (
  console.error("Unhandled Rejection", err)
));

mediator.on("db.ready", (client: MongoClient) => {
  let rep: Repository;
  Repository.connect(client)
    .then((repo) => {
      console.log("Repository Connected. Starting Server");
      rep = repo;
      return Server.start({
        port: serverSettings.port,
        repo,
      });
    })
    .then((app) => {
      console.log(`Server started successfully, running on port: ${serverSettings.port}`);

      app.on("close", () => {
        rep.disconnect();
      });
    });
});

mediator.on("db.error", (err: Error) => console.error(err));

Mongo.connect(dbSettings, mediator);

mediator.emit("boot.ready");
