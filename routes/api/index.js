const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const studentRoutes = require('./studentRoutes');

// router.use('/courses', courseRoutes);
router.use('/user', userRoutes);

module.exports = router;
