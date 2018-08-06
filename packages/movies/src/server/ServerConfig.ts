import { Repository } from "../repository/Repository";

export interface ServerConfig {
  readonly port: string;
  readonly repo: Repository;
}
