import mongoose from 'mongoose';
var schema = mongoose.Schema;

var projectSchema = schema({
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    level: { type: Number, required: false },
    begin_date: { type: Date, requiered: true },
    end_date: { type: Date, requiered: true },
    status: { type: String, required: true },
    team: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }]
}, {
    timestamps: true
});

const Project = mongoose.model('Project', projectSchema);
export default Project;