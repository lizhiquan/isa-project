const router = require('express').Router();

router.use('/chores', require('./chores'));

module.exports = router;
