import joi from "joi";

export const bookingSchema = (joiObj: typeof joi) => ({
  cinemaRoom: joiObj.number(),
  city: joiObj.string(),
  movie: joiObj.string(),
  schedule: joiObj.date().min("now"),
  seats: joiObj
    .array()
    .items(joiObj.string())
    .single(),
  totalAmount: joiObj.number(),
});
