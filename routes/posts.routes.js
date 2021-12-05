const express = require('express');
const router = express.Router();

/* == CTRLS == */
const ctrls = require('../controllers');

/* http://localhost:3003/holidays */

router.get('/', ctrls.posts.index);
router.post('/', ctrls.posts.create);
router.put('/:id', ctrls.posts.update);
router.delete('/:id', ctrls.posts.destroy);

module.exports = router;
