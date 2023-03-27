const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Sandy',
//   });
// });

router.get('/', viewsController.getOverview);
router.get('/tour/:tourSlug', viewsController.getTour);

module.exports = router;
