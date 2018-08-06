import { ServerConfig } from "../server/ServerConfig";
import { DbConfig } from "./db/DbConfig";
import * as ssl from "./ssl";

export const dbSettings: DbConfig = {
  db: process.env.DB || "movies",
  dbParams: {
    j: true,
    native_parser: false,
    readPreference: "ReadPreference.SECONDARY_PREFERRED",
    w: "majority",
    wtimeout: 10000,
  },
  password: process.env.DB_USER || "#megaboy101",
  repl: process.env.DB_REPLS || "rs1",
  replsetParams: (replset = "rs1") => ({
    ha: true,
    haInterval: 10000,
    poolsize: 10,
    replicaSet: replset,
    socketoptions: {
      connectTimeoutMS: 30000,
      keepAlive: 300,
      socketTimeoutMS: 30000,
    },
  }),
  serverParams: {
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      connectTimeoutMS: 30000,
      keepAlive: 300,
      socketTimeoutMS: 30000,
    },
  },
  servers: process.env.DB_SERVERS
    ? process.env.DB_SERVERS.split(" ")
    : ["192.168.99.100:27017", "192.168.99.101:27017", "192.168.99.102:27017"],
  user: process.env.DB_USER || "megaboy",
};

export const serverSettings: ServerConfig = {
  port: process.env.PORT || "3000",
  ssl,
};
