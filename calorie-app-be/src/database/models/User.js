var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,  unique: true, index: true},
    password: { type: String, required: true},
    createdAt: { type: Date, required: true, default : new Date() },
    isAdmin: { type: Boolean, required: true, default : false },
    calorieLimit: { type: Number, required: true, default: 2100 }
});

module.exports = mongoose.model("User", UserSchema);