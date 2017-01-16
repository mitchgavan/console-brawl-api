const router = require('express').Router();

router.use('/games', require('./game/gameRoutes'));
// router.use('/platforms', require('./platform/platformRoutes'));

module.exports = router;
