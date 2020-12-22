var express = require('express');
var router = express.Router();

const MembersController = require('../controllers/members');

/**
 * @route   GET /api/members/
 * @desc    Get all members
 * @access
 */

router.route('/')
    .get(MembersController.findMembers);

router.route('/')
    .post(MembersController.createMembers);

router.route('/')
    .delete(MembersController.deleteMembers);

router.route('/all')
    .get(MembersController.findAllMembers);

module.exports = router;