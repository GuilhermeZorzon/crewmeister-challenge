const mongoose = require('mongoose');
const absencesSchema = require('../models/Absences');

module.exports = {

    findAbsences: async (req, res, next) => {
        console.log('AbsencesController.findAbsences() called!');
        
        let Absence = mongoose.model('absences', absencesSchema)

        // Getting data from absences and merging with members data
        Absence.aggregate([
            {
                $match: {
                    '$or': [
                        {
                            'startDate': {
                                '$gte': req.query.startDate,
                                '$lte': req.query.endDate
                            }
                        },
                        {
                            'endDate': {
                                '$gte': req.query.startDate,
                                '$lte': req.query.endDate
                            }
                        },
                    ]
                }
            },
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
                                ]}
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
            { $project: { member: 0 } }
        ], function(err, result) {
            console.log(result[0])
            res.json({result}); 
        });
    }
    
}