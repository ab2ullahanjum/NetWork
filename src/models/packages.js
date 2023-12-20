const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    realprice: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    recommended: {
        type: Boolean, // Use Boolean type for checkbox
        default: false // Set default value to false if not provided
    }
});

const PackageModel = mongoose.model('Package', PackageSchema);

module.exports = PackageModel;

