import joi from "joi";

export const userSchema = (joiObj: typeof joi) => ({
  creditCard: joiObj.string().creditCard().required(),
  email: joiObj.string().email().required(),
  lastName: joiObj.string().regex(/^[a-bA-B]+/).required(),
  membership: joiObj.number(),
  name: joiObj.string().regex(/^[a-bA-B]+/).required(),
  phoneNumber: joiObj.string().regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
});
