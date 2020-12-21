const mongoose = require('mongoose');
const membersSchema = require('../models/Members');

module.exports = {

    findMembers: async (req, res, next) => {
        console.log('MembersController.findMembers() called!');
        
        let Member = mongoose.model('members', membersSchema)

        let crewIds = []
        for(key in req.body.crewIds) { 
            storeTypes.push(String(req.body.crewIds[key]))
        }

        let userIds = []
        for(key in req.body.userIds) { 
            storeTypes.push(String(req.body.userIds[key]))
        }

        let names = []
        for(key in req.body.names) { 
            storeTypes.push(String(req.body.names[key]))
        }

        Member.aggregate([
            {$match: 
                {
                    'crewId': {  $in: crewIds },
                    'userId': {  $in: userIds },
                    'name': {  $in: names },
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

        const { crewId, id, image, name, userId } = req.body;
        
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