var express = require('express');
var router = express.Router();

const MembersController = require('../controllers/members');

/**
 * @route   GET /api/members/
 * @desc    Get all members
 * @access
 */

router.route('/members')
    .get(MembersController.findMembers);

router.route('/members')
    .post(MembersController.createMembers);

router.route('/members')
    .delete(MembersController.deleteMembers);

module.exports = router;