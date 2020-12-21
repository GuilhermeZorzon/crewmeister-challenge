const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MembersSchema = new Schema({
    crewId: {type: Number, },
    id: {type: Number, },
    image: {type: String,},
    name: {type: String,},
    userId: {type: Number,},
});


// Export Model
module.exports = MembersSchema;
