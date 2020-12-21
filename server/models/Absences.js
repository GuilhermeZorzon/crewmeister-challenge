const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MembersSchema = new Schema({
    absence_days: {type: Array, },
    admitterId: {type: Number, },
    admitterNote: {type: String, },
    confirmedAt: {type: String, },
    crewId: {type: Number,},
    endDate: {type: String,},
    id: {type: Number,},
    memberNote: {type: String,},
    rejectedAt: {type: String,},
    startDate: {type: String,},
    type: {type: String,},
    userId: {type: Number,},
});


// Export Model
module.exports = MembersSchema;
