const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({

    blog: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Blog", BlogSchema)


