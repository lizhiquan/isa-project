const router = require('express').Router();
const db = require('../../db');
const auth = require('../../middlewares/auth');
const { validate, Joi } = require('express-validation');

router.get('/', async (req, res, next) => {
  try {
    const rows = await db('course');
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  auth.required,
  validate({
    body: Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { code, name } = req.body;
      const [course] = await db('course').where({ code });
      if (course) {
        return res.status(409).json({
          message: 'course already exists',
          data: course,
        });
      }
      await db('course').insert({ code, name });
      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  },
);

router.put(
  '/:id',
  auth.required,
  validate({
    body: Joi.object({
      code: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const nAffectedRows = await db('course')
        .where({ id: req.params.id })
        .update({ code: req.body.code, name: req.body.name });
      res.sendStatus(nAffectedRows ? 204 : 404);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', auth.required, async (req, res, next) => {
  try {
    const nAffectedRows = await db('course').where({ id: req.params.id }).del();
    res.sendStatus(nAffectedRows ? 204 : 404);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
