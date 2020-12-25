const mongoose = require('mongoose');
const absencesSchema = require('../models/Absences');

function defineMatchClause(query) {
    let matchClause = {}
    if((query.startDate !== undefined && query.startDate !== null) && (query.endDate !== undefined && query.endDate !== null)) {
        matchClause['$or'] = [
            {
                'startDate': {
                    '$gte': query.startDate,
                    '$lte': query.endDate
                }
            },
            {
                'endDate': {
                    '$gte': query.startDate,
                    '$lte': query.endDate
                }
            },
        ]
    }
    if(query.userIds !== undefined && query.userIds !== null) {
        // Transforming queried user ids into numbers
        let userIds = []
        for(userId in query.userIds) { 
            userIds.push(Number(query.userIds[userId]))
        }

        matchClause['userId'] = {  $in: userIds }
    }

    return matchClause
}

module.exports = {

    findAbsences: async (req, res, next) => {
        console.log('AbsencesController.findAbsences() called!');
        
        let Absence = mongoose.model('absences', absencesSchema)

        let matchClause = defineMatchClause(req.query);
        
        // Getting data from absences and merging with members data
        Absence.aggregate([
            {
                $lookup: {
                    from: "members",
                    let: {
                        userId: "$userId",
                        crewId: "$crewId"
                    },
                    pipeline: [
                        {
                            $match: {
                                $expr: {$and: [
                                    {
                                        $eq: [ "$userId", "$$userId" ]
                                    },
                                    {
                                        $eq: [ "$crewId", "$$crewId" ]
                                    }
                                ]},
                            }
                        }
                    ],
                    as: "member"
                }
            },
            {
                $replaceRoot: {
                   newRoot: {
                      $mergeObjects: [
                        {
                            $arrayElemAt: [ "$member", 0 ]
                        },
                        "$$ROOT"
                      ]
                   }
                }
            },
            { $project: { member: 0 } },
            {
                $match: matchClause
            }
        ], function(err, result) {
            console.log(result[0])
            res.json({result});
            return result
        });
    }
    
}