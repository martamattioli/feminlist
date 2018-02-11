const express = require('express');
const router = express.Router();

const docs = require('../controllers/docs');

router.route('/docs')
  .get(docs.index);

module.exports = router;
