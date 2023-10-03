const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const blogpostSchema = new Schema({
  blogpostText: {
    type: String,
    required: "You need to leave a description!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  blogpostAuthor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // trim: true,
  },
  // authorIcon: {
  //   type: Number,
  //   required: true
  // },
  // blogpostLocation: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  imageUrl: {
    type: String,
    required: false,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Blogpost = model("Blogpost", blogpostSchema);

module.exports = Blogpost;
