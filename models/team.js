import mongoose from 'mongoose';
import { stringify } from 'querystring';
var schema = mongoose.Schema;

var teamSchema = schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    collegues: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, ]

}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
export default Team;