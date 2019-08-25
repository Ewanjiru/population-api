const joi = require('joi');
const { celebrate, Joi } = require('celebrate');

Joi.objectId = require('joi-objectid')(Joi);

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

const validateLocation = (locationDetails) => {
  const schema = {
    name: joi.string().max(50).min(2).required(),
    femaleCount: joi.number().default(0),
    maleCount: joi.number().default(0),
  };

  return (joi.validate(locationDetails, schema));
};

module.exports = {
  validateId,
  validateLocation
};
