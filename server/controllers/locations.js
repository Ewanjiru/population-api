const Location = require('../models/locations');
const SubLocation = require('../models/subLocations');
const { validateLocation } = require('../middleware/validation');

const createLocation = () => async (req, res) => {
  try {
    const { name, femaleCount, maleCount, subLocations } = req.body;
    const { error } = validateLocation({ name, femaleCount, maleCount })
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const newLocation = new Location({
      name,
      femaleCount,
      maleCount,
      population: maleCount + femaleCount
    });
    const createdLocation = await newLocation.save();
    let allSubLocations = [];
    if (subLocations && subLocations.length) {
      subLocations.forEach(subLocation => {
        subLocation.population = subLocation.femaleCount + subLocation.maleCount;
        subLocation.location = createdLocation._id;
      });
      allSubLocations = await SubLocation.insertMany(subLocations);
    }
    res.status(201).send({ location: createdLocation, subLocations: allSubLocations });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const getAllLocations = () => async (req, res) => {
  try {
    const locations = await Location.find({});
    const subLocations = await SubLocation.find({});
    const allLocations = locations.map(location => {
      const sublocations = subLocations.filter(subLocation => subLocation.location && subLocation.location.equals(location._id));
      location = JSON.parse(JSON.stringify(location));
      location['subLocations'] = sublocations;
      return location;
    });
    res.status(200).send(allLocations);
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const updateLocation = () => async (req, res) => {
  try {
    const subLocation = await SubLocation.findById(req.params.id);
    const location = await Location.findById(req.params.id);
    if (!subLocation && !location) return res.status(404).send({ message: 'That Location does not exist' });

    const { name, femaleCount, maleCount } = req.body;
    const newLocation = {
      name,
      femaleCount,
      maleCount,
      population: maleCount + femaleCount,
    };

    let updatedLocation;
    if (location) {
      updatedLocation = await Location.findByIdAndUpdate(req.params.id, newLocation)
    }
    if (subLocation) {
      updatedLocation = await SubLocation.findByIdAndUpdate(req.params.id, newLocation)
    }
    res.status(200).send({ message: 'Successfully updated' });
  } catch (err) {
    res.status(400).json({ Message: err.message });
  }
};

const deleteLocation = () => async (req, res) => {
  try {
    const subLocation = await SubLocation.findById(req.params.id);
    const location = await Location.findById(req.params.id);
    if (!subLocation && !location) return res.status(404).send({ message: 'That Location does not exist' });

    if (location) {
      await SubLocation.find({ location: req.params.id }).updateMany({ $unset: { 'location': '' } });
      await Location.findOneAndRemove({ _id: req.params.id });
    }

    if (subLocation) {
      await SubLocation.findOneAndRemove({ _id: req.params.id });
    }
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
