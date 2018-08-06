import { EventEmitter } from "events";
import { init } from "./config";
import { Repository } from "./repository/Repository";
import { Server } from "./server/Server";

const mediator = new EventEmitter();

console.log("--- Booking Service ---");
console.log("Connecting to movies repository");

process.on("uncaughtException", (err: Error) =>
  console.error("Unhandled Exception", err),
);

process.on("unhandledRejection", (err: Error) =>
  console.error("Unhandled Rejection", err),
);

mediator.on("di.ready", (container) => {
  Repository.connect(container)
    .then((repo) => {
      console.log("Connected. Starting Server");
      container.registerValue({ repo });
      return Server.start(container);
    })
    .then(() => {
      console.log(`Server started succesfully, running on port: ${container.cradle.serverSettings.port}.`);
      // app.on("close", () => {
      //   container.resolve("repo").disconnect();
      // });
    });
});

init(mediator);

mediator.emit("init");
