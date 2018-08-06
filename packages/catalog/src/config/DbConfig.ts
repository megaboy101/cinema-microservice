export interface DbConfig {
  readonly db: string;
  readonly dbParams: DbParams;
  readonly password: string;
  readonly repl: string;
  readonly replsetParams: (replset: string) => ReplsetParams;
  readonly serverParams: ServerParams;
  readonly servers: ReadonlyArray<string>;
  readonly user: string;
}

interface DbParams {
  readonly j: boolean;
  readonly native_parser: boolean;
  readonly readPreference: string;
  readonly w: string;
  readonly wtimeout: number;
}

interface ReplsetParams {
  readonly ha: boolean;
  readonly haInterval: number;
  readonly poolsize: number;
  readonly replicaSet: string;
  readonly socketoptions: SocketOptions;
}

interface ServerParams {
  readonly autoReconnect: boolean;
  readonly poolSize: number;
  readonly socketoptions: SocketOptions;
}

interface SocketOptions {
  readonly connectTimeoutMS: number;
  readonly keepAlive: number;
  readonly socketTimeoutMS: number;
}
