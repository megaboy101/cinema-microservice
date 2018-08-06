import { Collection, Db, MongoClient } from "mongodb";

import { Movie } from "./models/Movie";

export class Repository {
  public static connect(connection: MongoClient): Promise<Repository> {
    return new Promise((resolve, reject) => {
      connection
        ? resolve(new Repository(connection))
        : reject(new Error("A db connection must be supplied"));
    });
  }

  private readonly client: MongoClient;
  private readonly collection: Collection<Movie>;
  private readonly db: Db;

  constructor(client: MongoClient) {
    this.client = client;
    this.db = client.db("movies");
    this.collection = this.db.collection("movies");
  }

  public fetchMovies(): Promise<ReadonlyArray<Movie>> {
    return new Promise((resolve, reject) => {
      const cursor = this.collection.find({}).project({ title: 1, id: 1 });

      cursor.toArray((err, movies) => {
        err ? reject(new Error(err.message)) : resolve(movies.slice());
      });
    });
  }

  public fetchPremiers(): Promise<ReadonlyArray<Movie>> {
    return new Promise((resolve, reject) => {
      const currentDay = new Date();
      const query = {
        releaseDay: {
          $lte: currentDay.getDate(),
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2,
        },
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear(),
        },
      };

      const cursor = this.collection.find(query);

      cursor.toArray((err, movies) => {
        err ? reject(new Error(err.message)) : resolve(movies.slice());
      });
    });
  }

  public movieById(id: string): Promise<Movie> {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 };
      const sendMovie = (err: Error, movie: Movie) => {
        err ? reject(new Error(err.message)) : resolve(movie);
      };

      this.collection.findOne({ id }, { projection }, sendMovie);
    });
  }

  public disconnect(): void {
    this.client.close();
  }
}
