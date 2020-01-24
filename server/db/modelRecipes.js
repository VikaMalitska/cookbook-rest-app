const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

//mongoose.set('useFindAndModify', false);

const Schema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    ingredients: {
        type: [],
        required: [true,"ingredients are required!"]
    },
    recipe: {
        type: String,
        default: ""
    },
    date: {
        type: Date,
        default: new Date,
    },
    keyId: {
    },
    version: {
        type: Number
    }
});

Schema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("Recipe", Schema);
