const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Sandy',
//   });
// });

router.get('/', viewsController.getOverview);
router.get('/tour/:tourSlug', authController.protect, viewsController.getTour);
router.get('/login', viewsController.login);

module.exports = router;
