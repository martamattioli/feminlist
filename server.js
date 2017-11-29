const express = require('express');
const app = express();
const port = process.ENV.PORT || 4000;

app.use(express.static(`${__dirname}/public`));

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Running on port ${port}`));
