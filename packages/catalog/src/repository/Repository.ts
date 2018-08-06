import { AggregationCursor, Collection, Db, MongoClient, ObjectID } from "mongodb";

import { Cinema } from "../api/interfaces";

export class Repository {
  public static connect(connection: MongoClient): Promise<Repository> {
    return new Promise((resolve, reject) => {
      connection
        ? resolve(new Repository(connection))
        : reject(new Error("Connection to db not supplied"));
    });
  }

  private readonly client: MongoClient;
  private readonly collection: Collection<Cinema>;
  private readonly db: Db;

  constructor(client: MongoClient) {
    this.client = client;
    this.db = client.db("catalog");
    this.collection = this.db.collection("cinemas");
  }

  public cinemaByCity(cityId: string): Promise<ReadonlyArray<Cinema>> {
    return new Promise((resolve, reject) => {
      const cursor = this.collection
        .find({ city_id: cityId })
        .project({ _id: 1, name: 1 });

      cursor.toArray((err, cinemas) => {
        err ? reject(new Error(err.message)) : resolve(cinemas);
      });
    });
  }

  public cinemaById(cinemaId: string): Promise<Cinema> {
    return new Promise((resolve, reject) => {
      const projection = { _id: 1, name: 1, cinemaPremiers: 1 };

      this.collection
        .findOne({ _id: new ObjectID(cinemaId) }, { projection }, (err, cinema: Cinema) => {
          err
          ? reject(new Error(err.message))
          : resolve(cinema);
        });
    });
  }

  public cinemaScheduleByMovie(options: AggregateConfig): Promise<AggregationCursor<Cinema>> {
    return new Promise((resolve, reject) => {
      const match = {
        $match: {
          "cinemaRooms.schedules.movie_id": options.movieId,
          "city_id": options.cityId,
        },
      };

      const project = {
        $project: {
          "cinemaRooms.format": 1,
          "cinemaRooms.name": 1,
          "cinemaRooms.schedules.time": 1,
          "name": 1,
        },
      };

      const unwind: ReadonlyArray<any> = [
        { $unwind: "$cinemaRooms" },
        { $unwind: "$cinemaRooms.schedules" },
      ];

      const group: ReadonlyArray<any> = [{
        $group: {
          _id: {
            name: "$name",
            room: "$cinemaRooms.name",
          },
          schedules: { $addToSet: "$cinemaRooms.schedules.time" },
        },
      }, {
        $group: {
          _id: "$_id.name",
          schedules: {
            $addToSet: {
              room: "$_id.room",
              schedules: "$schedules",
            },
          },
        },
      }];

      this.collection
        .aggregate([ match, project, ...unwind, ...group ], (err, result) => {
          err
          ? reject(err.message)
          : resolve(result);
        });
    });
  }

  public disconnect(): void {
    this.client.close();
  }
}

interface AggregateConfig {
  readonly cityId: string;
  readonly movieId: string;
}
