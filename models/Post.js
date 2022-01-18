const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        image : String,
        caption: { type: String, required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        likes: Number
    }, 
    {
        timestamps: true
    })

module.exports = mongoose.model("Post", postSchema);