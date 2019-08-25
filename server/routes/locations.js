const router = require('express').Router();

const controllers = require('../controllers/locations');
const { validateId } = require('../middleware/validation');

router.get('/', controllers.getAllLocations());
router.post('/', controllers.createLocation());
router.put('/:id', validateId, controllers.updateLocation());
router.delete('/:id', validateId, controllers.deleteLocation());

module.exports = router;
