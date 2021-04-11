const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/courses', require('./courses'));
router.use('/homework', require('./homework'));
router.use('/stats', require('./stats'));

module.exports = router;
