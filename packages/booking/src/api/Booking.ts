import express from "express";
import status from "http-status";
import { Repository } from "../repository/Repository";

export class Booking {
  public static route({ repo }: { readonly repo: Repository }, app: express.Express): void {
    app.post("/booking", (req: any, res, next) => {
      const validate = req.container.cradle.validate;
      const paymentService = req.container.resolve("paymentService");
      const notificationService = req.container.resolve("notificationService");

      Promise.all([
        validate(req.body.user, "user"),
        validate(req.body.booking, "booking"),
      ])
        .then(([user, booking]) => {
          const payment = {
            amount: booking.amount,
            currency: "mxn",
            cvc: user.creditCard.cvc,
            description: `
            Tickect(s) for movie ${booking.movie},
            with seat(s) ${booking.seats.toString()}
            at time ${booking.schedule}`,
            exp_month: user.creditCard.exp_month,
            exp_year: user.creditCard.exp_year,
            number: user.creditCard.number,
            userName: user.name + " " + user.lastName,
          };

          return Promise.all([
            paymentService(payment),
            Promise.resolve(user),
            Promise.resolve(booking),
          ]);
        })
        .then(([paid, user, booking]) => {
          return Promise.all([
            repo.makeBooking(user, booking),
            repo.generateTicket(paid, booking),
          ]);
        })
        .then(([booked, ticket]) => {
          notificationService({ booked, ticket });
          res.status(status.OK).json(ticket);
        })
        .catch(next);
    });

    app.get("/booking/verify/:orderId", (req, res) => {
      repo
      .orderById(req.params.orderId)
      .then((order) => {
        res.status(status.OK).json(order);
      });
    });
  }
}
