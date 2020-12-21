var express = require('express');
var router = express.Router();

const AbsencesController = require('../controllers/absences');

/**
 * @route   GET /api/Absences/
 * @desc    Get all absences
 * @access
 */

router.route('/absences')
    .get(AbsencesController.findAbsences);

// router.route('/absences')
//     .post(AbsencesController.createAbsences)

module.exports = router;