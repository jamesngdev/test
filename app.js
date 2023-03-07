const express = require('express');
const { process } = require('./src/services/validate/validate.service');
const app = express();

app.get('/getStatus', (req, res) => {
const email = `
chonetastic@gmail.com
mmcdarment@yahoo.com
nadine1@me.com
`
    process(email)
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
   