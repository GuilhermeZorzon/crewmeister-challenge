var express = require('express');
var router = express.Router();

const AbsencesController = require('../controllers/absences');

/**
 * @route   GET /api/Absences/
 * @desc    Get all absences
 * @access
 */

router.route('/')
    .get(AbsencesController.findAbsences);

// router.route('/')
//     .post(AbsencesController.createAbsences)

module.exports = router;