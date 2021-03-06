const router = require('express').Router();
const db = require('../../db');
const auth = require('../../middlewares/auth');
const { validate, Joi } = require('express-validation');

router.get('/', async (req, res, next) => {
  try {
    const rows = await db('homework').modify((queryBuilder) => {
      const course_id = req.query.course_id;
      if (course_id) {
        queryBuilder.where({ course_id });
      }
    });
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
      name: Joi.string().required(),
      content: Joi.string().required(),
      type: Joi.string().valid('lesson', 'lab'),
      due_date: Joi.date().format('iso').optional(),
      course_id: Joi.number().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { name, content, type, due_date, course_id } = req.body;
      await db('homework').insert({ name, content, type, due_date, course_id });
      res.sendStatus(201);
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(422).json({ message: 'invalid course_id' });
      }
      next(error);
    }
  },
);

router.put(
  '/:id',
  auth.required,
  validate({
    body: Joi.object({
      name: Joi.string().required(),
      content: Joi.string().required(),
      type: Joi.string().valid('lesson', 'lab'),
      due_date: Joi.date().format('iso').optional(),
      course_id: Joi.number().required(),
    }),
  }),
  async (req, res, next) => {
    try {
      const { name, content, type, due_date, course_id } = req.body;
      const nAffectedRows = await db('homework')
        .where({ id: req.params.id })
        .update({ name, content, type, due_date, course_id });
      res.sendStatus(nAffectedRows ? 204 : 404);
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(422).json({ message: 'invalid course_id' });
      }
      next(error);
    }
  },
);

router.delete('/:id', auth.required, async (req, res, next) => {
  try {
    const nAffectedRows = await db('homework')
      .where({ id: req.params.id })
      .del();
    res.sendStatus(nAffectedRows ? 204 : 404);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
