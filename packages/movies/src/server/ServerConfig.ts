import { Repository } from "../repository/Repository";

export interface ServerConfig {
  readonly port: string;
  readonly repo?: Repository;
  readonly ssl: Ssl;
}

interface Ssl {
  readonly key: Buffer;
  readonly cert: Buffer;
}
