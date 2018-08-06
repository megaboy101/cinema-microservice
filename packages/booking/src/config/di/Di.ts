import { asValue, createContainer } from "awilix";
import { EventEmitter } from "events";
import { ObjectID } from "mongodb";
import { SchemaValidator } from "../../models";
import { ServerConfig } from "../../server/ServerConfig";
import { Notification } from "../../services/Notification";
import { Payment } from "../../services/Payment";
import { DbConfig } from "../db/DbConfig";
import { Mongo } from "../db/Mongo";

export class Di {
  public static init(options: DiConfig, mediator: EventEmitter): void {
    const { serverSettings, dbSettings, database, models, services } = options;

    mediator.once("init", () => {
      mediator.on("db.ready", (db) => {
        const container = createContainer();

        container.register({
          ObjectID: asValue(database.ObjectID),
          booking: asValue(models.schemas.get("booking")),
          database: asValue(db),
          notificationService: asValue(services.Notification),
          paymentService: asValue(services.Payment),
          serverSettings: asValue(serverSettings),
          ticket: asValue(models.schemas.get("booking")),
          user: asValue(models.schemas.get("booking")),
          validate: asValue(models.SchemaValidator),
        });

        mediator.emit("di.ready", container);
      });

      mediator.on("db.error", (err: Error) => {
        mediator.emit("di.error", err);
      });

      database.connect(
        dbSettings,
        mediator,
      );

      mediator.emit("boot.ready");
    });
  }
}

interface DiConfig {
  readonly serverSettings: ServerConfig;
  readonly dbSettings: DbConfig;
  readonly database: {
    readonly connect: typeof Mongo.connect;
    readonly ObjectID: ObjectID;
  };
  readonly models: {
    readonly schemas: Map<any, any>;
    readonly SchemaValidator: SchemaValidator;
  };
  readonly services: {
    readonly Notification: Notification;
    readonly Payment: Payment;
  };
}
