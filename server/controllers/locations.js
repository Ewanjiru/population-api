const Location = require('../models/locations');
const { validateLocation, validatePopulation } = require('../middleware/validation');

const createLocation = () => async (req, res) => {
  try {
    const { name, femaleCount, maleCount, parentId } = req.body;
    const { error } = validateLocation({ name, femaleCount, maleCount });
    if (error) return res.status(400).send(error.details[0].message);

    if (parentId) {
      const parentLocation = await Location.findOne({ _id: parentId });
      if (!parentLocation) {
        return res.status(404).send({ message: "That parent Location does not exist" });
      }
    }

    const newLocation = new Location({
      name,
      femaleCount,
      maleCount,
      population: maleCount + femaleCount,
      linkedLocation: parentId
    });
    const createdLocation = await newLocation.save();

    res.status(201).send(createdLocation);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const getAllLocations = () => async (req, res) => {
  try {
    const locations = await Location.find({});

    res.status(200).send(locations);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const updateLocation = () => async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    const { name, femaleCount, maleCount, parentId } = req.body;
    if (!location) return res.status(404).send({ message: 'That Location does not exist' });
    if (!name && !femaleCount && !maleCount && !parentId) {
      return res.status(400).send({ message: 'No chnage detected' });
    }

    if (parentId) {
      if (parentId === req.params.id) {
        return res.status(404).send({ message: "Location can not be its own parent" });
      }

      const parentLocation = await Location.findOne({ _id: parentId });
      if (!parentLocation) {
        return res.status(404).send({ message: "That parent Location does not exist" });
      }
      req.body.linkedLocation = parentId;
    }

    req.body.population = validatePopulation(femaleCount, maleCount, location);
    await Location.findByIdAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).send({ message: 'Successfully updated' });

  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const deleteLocation = () => async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).send({ message: 'That Location does not exist' });
    await Location.find({ linkedLocation: req.params.id }).updateMany({ $unset: { 'linkedLocation': '' } });
    await Location.findOneAndRemove({ _id: req.params.id });
    res.status(200).send({ message: 'Successfully deleted' });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

module.exports = {
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation,
};
