import joi from "joi";

import { bookingSchema } from "./booking";
import { ticketSchema } from "./ticket";
import { userSchema } from "./user";

export const schemas = new Map();

schemas.set("booking", bookingSchema(joi));
schemas.set("ticket", ticketSchema(joi));
schemas.set("user", userSchema(joi));

export class SchemaValidator {
  public static validate<T>(object: T, type: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!object) {
        reject(new Error("No object provided to validate"));
      }

      if (!type) {
        reject(new Error("No schema type provieded to validate"));
      }

      const { error, value } = joi.validate(object, schemas.get(type));

      error
        ? reject(new Error(`invalid ${type} data, err: ${error}`))
        : resolve(value);
    });
  }
}
