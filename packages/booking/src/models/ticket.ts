import joi from "joi";

export const ticketSchema = (joiObj: typeof joi) => ({
  cinema: joiObj.string(),
  cinemaRoom: joiObj.number(),
  movie: joiObj.string(),
  orderId: joiObj.number(),
  schedule: joiObj.date().min("now"),
  seat: joiObj
    .array()
    .items(joiObj.string())
    .single(),
});
