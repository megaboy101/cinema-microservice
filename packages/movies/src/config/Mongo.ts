import { EventEmitter } from "events";
import { MongoClient, MongoError } from "mongodb";
import { DbConfig } from "./DbConfig";

export class Mongo {
  public static connect(options: DbConfig, mediator: EventEmitter): void {
    mediator.once("boot.ready", () => {
      MongoClient.connect(
        this.mongoURL(options),
        {
          auth: {
            password: options.password,
            user: options.user,
          },
          authSource: "adming",
        },
        (err: MongoError, client: MongoClient) => {
          if (err) {
            mediator.emit("db.error", err);
          }

          mediator.emit("db.ready", client);
        },
      );
    });
  }

  private static mongoURL(options: DbConfig): string {
    const url = options.servers.reduce(
      (total, current) => total + current + ",", "mongodb://");

    return `${url.substr(0, url.length - 1)}/${options.db}`;
  }
}
