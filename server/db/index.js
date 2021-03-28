const knex = require('knex');
const env = require('../config').env;
const config = require('../knexfile')[env];
const db = knex(config);

module.exports = db;
