var mongoose = require('mongoose');

// food will contain date/time when taken, name, calorie value
var FoodSchema = mongoose.Schema({

    dateOfConsumption: {type: Date, required: true},
    product: [{name: String, calorie: Number, time: String}],
    totalCalories: {type: Number, required: true},
    createdAt: { type: Date, required: true, default : new Date() },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

});

module.exports = mongoose.model("Food", FoodSchema);