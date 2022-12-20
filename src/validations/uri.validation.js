const joi = require('joi');

exports.checkIdPattern = joi
  .string()
  .regex(/^[\d]+$/);