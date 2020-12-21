const mongoose = require('mongoose');
const membersSchema = require('../models/Members');

module.exports = {

    findMembers: async (req, res, next) => {
        console.log('MembersController.findMembers() called!');
        console.log('req query', req.query)
        let Member = mongoose.model('members', membersSchema)

        let crewIds = []
        for(crewId in req.query.crewIds) { 
            crewIds.push(Number(req.query.crewIds[crewId]))
        }

        let userIds = []
        for(userId in req.query.userIds) { 
            userIds.push(Number(req.query.userIds[userId]))
        }

        Member.aggregate([
            {$match: 
                {
                    'crewId': {  $in: crewIds },
                    'userId': {  $in: userIds },
                }
            },
            {
                $group: {
                    '_id': { 'userId': '$userId' }, 
                    'crewId': { $first: '$crewId' },
                    'userId': { $first: '$userId' },
                    'name': { $first: '$name' },
                    'image': { $first: '$image' },
                }
            }
        ], function(err, result) {
            console.log(result[0])
            res.json({result}); 
        });
	},
		
	
    createMembers: async (req, res, next) => {
        console.log('MembersController.createMembers() called!');

        const { crewId, id, image, name, userId } = req.query;
        
        let Member = mongoose.model('members', membersSchema)

        const member = new Member(
            { 
                crewId: crewId,
                id: id,
                image: image,
                name: name,
                userId: userId
            }
        )

        member.save(function(err, doc) {
            res.json({doc}); 
        });
    },
	
	deleteMembers: async (req, res, next) => {
        console.log('MembersController.deleteMembers() called!');

        console.log('id', req.query.id)
        
        let Member = mongoose.model('members', membersSchema)

        Member.deleteOne( {"_id": req.query.id}, (function(err, doc) {
            if (err) {
                res.status(500).json({ err });
                return;
            }
            res.send({ msg: "successfully deleted" }); 
        }));
    },
    
}