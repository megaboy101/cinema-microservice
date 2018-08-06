import { AwilixContainer } from "awilix";
import { Db, MongoClient, ObjectID } from "mongodb";

export class Repository {
  public static connect(connection: AwilixContainer): Promise<Repository> {
    return new Promise((resolve, reject) => {
      connection
        ? resolve(new Repository(connection))
        : reject(new Error("Connection to db not supplied"));
    });
  }

  // private readonly container: AwilixContainer;
  private readonly client: MongoClient;
  private readonly db: Db;

  constructor(container: AwilixContainer) {
    // this.container = container;
    this.client = container.cradle.database;
    this.db = this.client.db("booking");
  }

  public makeBooking(user: any, booking: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        book: {
          movie: {
            format: booking.movie.format,
            schedule: booking.schedule,
            title: booking.movie.title,
          },
          userType: user.membership ? "loyal" : "normal",
        },
        cinema: booking.cinema,
        city: booking.city,
      };

      this.db.collection("booking").insertOne(payload, (err, booked) => {
        err ? reject(new Error(err.message)) : resolve(booked);
      });
    });
  }

  public generateTicket(paid: any, booking: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const payload = {
        booking,
        orderId: paid._id,
      };

      this.db.collection("tickets").insertOne(payload, (err, ticket) => {
        err ? reject(new Error(err.message)) : resolve(ticket);
      });
    });
  }

  public orderById(orderId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // const objectID: ObjectID = this.container.resolve("ObjectID");
      const query = { _id: new ObjectID(orderId) };

      this.db.collection("booking").findOne(query, {}, (err, order) => {
        err ? reject(new Error(err.message)) : resolve(order);
      });
    });
  }

  public disconnect(): void {
    this.client.close();
  }
}
