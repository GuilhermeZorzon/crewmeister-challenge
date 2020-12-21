const mongoose = require('mongoose');
const absencesSchema = require('../models/Absences');

module.exports = {

    findAbsences: async (req, res, next) => {
        console.log('AbsencesController.findAbsences() called!');
        
        let Absence = mongoose.model('absences', absencesSchema)

        Absence.aggregate([
            {$match: 
                {
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
            }
        ], function(err, result) {
            console.log(result[0])
            res.json({result}); 
        });
	},
		
	
    // createAbsences: async (req, res, next) => {
    //     console.log('AbsencesController.createAbsences() called!');

    //     const { crewId, id, image, name, userId } = req.body;
        
    //     let Absence = mongoose.model('members', absencesSchema)

    //     const member = new Absence(
    //         { 
    //             absence_days: {type: Array, },
    //             admitterId: {type: Number, },
    //             admitterNote: {type: String, },
    //             confirmedAt: {type: String, },
    //             crewId: {type: Number,},
    //             endDate: {type: String,},
    //             id: {type: Number,},
    //             memberNote: {type: String,},
    //             rejectedAt: {type: String,},
    //             startDate: {type: String,},
    //             type: {type: String,},
    //             userId: {type: Number,},
    //         }
    //     )

    //     member.save(function(err, doc) {
    //         res.json({doc}); 
    //     });
    // },
    
}