const db = require('../db');

async function trackUsage(req, res, next) {
  try {
    const [stat] = await db('stat').where({
      method: req.method,
      endpoint: req.path,
    });
    if (stat) {
      await db('stat')
        .where({
          method: req.method,
          endpoint: req.path,
        })
        .update({ count: stat.count + 1 });
    } else {
      await db('stat').insert({
        method: req.method,
        endpoint: req.path,
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    next();
  }
}

module.exports = trackUsage;
