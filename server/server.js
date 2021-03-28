const config = require('./config');
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = config.corsDomain && {
  origin: config.corsDomain,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', require('./routes'));

const server = app.listen(config.port, function () {
  console.log('Listening on port ' + server.address().port);
});
