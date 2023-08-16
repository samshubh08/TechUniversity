const joi = require("joi");

const Schema = joi.object({
  first_name: joi.string().min(1).max(20).required(),
  last_name: joi.string().min(1).max(20).required(),
  name: joi.string().min(1).max(20).required(),
  gender: joi.string().min(1).max(20).required(),
  contact: joi.string().pattern(/^\+?\d{1,3}[- ]?\d{3,4}[- ]?\d{4}$/).required(),
  d_o_b: joi
    .string()
    .regex(/^(19|20)\d{2}$/)
    .options({
      messages: {
        "string.pattern.base": "Year must be between 1900 and 2100",
      },
    }),
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com"] } }).required(),
  // password: joi.string().pattern(new RegExp("^[a-zA-z0-9]{3,100}$")),
  role: joi.number(),
  city: joi.string().min(1).max(20).required(),
  state: joi.string().min(1).max(20).required(),
  zip: joi.number().integer().min(000000).max(999999).required(),
  country: joi.string().min(1).max(20).required(),
  description: joi.string().min(1).max(100).required(),
  // starts_from: joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // course_duration: joi.string().pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/),
  duration: joi.string().pattern(/^([01][0-9]|2[0-3]):[0-5][0-9]$/).required(),
  course_price: joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(),
  year: joi.number().integer().min(1900).max(2100).required(),
  price: joi.string().pattern(/^\d+(\.\d{1,2})?$/).required(),
  title: joi.string().min(1).max(20).required(),
  subject: joi.string().min(1).max(20).required(),
  author: joi.string().min(1).max(20).required(),
  department: joi.string().min(1).max(20).required(),
  head_of_department: joi.string().min(1).max(20).required(),
  department_description: joi.string().min(1).max(20).required(),
  unit: joi.string().min(1).max(20).required(),
});

exports.valid = async (req, res, next) => {
  try {
    const value = await Schema.validate(req.body);
    if (value.error) {
      return res.status(400).send({ error: value.error.details });
    } else {
      next();
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
