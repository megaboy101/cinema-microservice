import { ObjectID } from "mongodb";
import * as models from "../models";
import { Notification } from "../services/Notification";
import { Payment } from "../services/Payment";
import { dbSettings, serverSettings } from "./config";
import { Mongo } from "./db/Mongo";
import { Di } from "./di/Di";

const config = {
  database: {
    ObjectID,
    connect: Mongo.connect,
  },
  dbSettings,
  models,
  serverSettings,
  services: {
    Notification,
    Payment,
  },
};

export const init = Di.init.bind(null, config);
