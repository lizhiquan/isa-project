const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db');
const { validate, Joi } = require('express-validation');
const { secret, tokenExpiresInHours } = require('../../config');

const loginValidation = {
  body: Joi.object({
    username: Joi.string()
      .regex(/^\S*$/) // a string consisting only of non-whitespaces
      .required(),
    password: Joi.string().required(),
  }),
};

router.post(
  '/authenticate',
  validate(loginValidation),
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const rows = await db('user').where({ username });
      const user = rows[0];
      if (user) {
        if (await bcrypt.compare(password, user.hashed_password)) {
          const token = jwt.sign({ id: user.id, username }, secret, {
            expiresIn: tokenExpiresInHours + 'h',
          });
          return res.json({ token });
        }
      }
      res.sendStatus(401);
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
