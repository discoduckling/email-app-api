const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema],
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // says that every schema belongs to a particular user in the users collection, this _ indicates that this is setting up a relationship
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);