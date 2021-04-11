const router = require('express').Router();
const db = require('../../db');
const auth = require('../../middlewares/auth');

router.get('/', auth.required, async (req, res, next) => {
  try {
    const stats = await db('stat');
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
