const mongoose = require("mongoose");
//const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    ingredients: {
        type: [],
        required: [true, "ingredients are required!"]
    },
    recipe: {
        type: String,
        default: ""
    },
    date: {
        type: Date
    },
    keyId: {
        type: String
    }
});

//Schema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = mongoose.model("Archive", Schema);
