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

const validatePopulation = ({ femaleCount, maleCount, location }) => {
  if (femaleCount && !maleCount) population = femaleCount + location.maleCount;
  if (!femaleCount && maleCount) population = maleCount + location.femaleCount;
  if (femaleCount && maleCount) population = femaleCount + maleCount;
  if (!femaleCount && !maleCount) population = location && location.population;

  return population;
}

module.exports = {
  validateId,
  validateLocation,
  validatePopulation
};
