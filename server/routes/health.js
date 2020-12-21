var express = require('express');
var router = express.Router();

const HealthController = require('../controllers/health');

/**
 * @route   GET /api/Absences/
 * @desc    Get all absences
 * @access
 */

router.route('/')
    .get(HealthController.getHealth);

// router.route('/absences')
//     .post(AbsencesController.createAbsences)

module.exports = router;