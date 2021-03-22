import mongoose from 'mongoose';
var schema = mongoose.Schema;


var userSchema = schema({
    email: { type: String, required: true, unique: true, text: true },
    name: { type: String, required: true, text: true },
    surname: { type: String, required: true, text: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;