import mongoose from 'mongoose';
var schema = mongoose.Schema;

var screamSchema = schema({

    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: false },
    messages: [{
        //id: mongoose.ObjectId,
        authorUsername: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        createdAt: { type: mongoose.Schema.Types.Date, required: true },
    }]

}, {
    timestamps: true
});

const Scream = mongoose.model('Scream', screamSchema);
export default Scream;