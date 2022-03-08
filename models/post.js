const mongoose = require("mongoose");
const slugify = require("slugify");
const { DateTime } = require("luxon");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  upvotes: [String],
  status: { type: String, default: "suggestion" },
  description: { type: String, required: true },
  comments: [
    {
      content: String,
      user: { image: String, name: String, email: String },
      replies: [
        {
          content: String,
          replyingTo: String,
          user: { image: String, name: String, email: String },
        },
      ],
    },
  ],
  date: { type: Date, default: DateTime.now().toUTC() },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

PostSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Post", PostSchema);

// {
//   "content": "this is my comment",
//   "user": { "image": "image location", "name": "user name is bob", "email": "email is 123@qq.com" },
//   "replies": {
//     "content": "This is the reply to your comment",
//     "replyingTo": "Reply to this person",
//     "user": { "image": "image location", "name": "user name is Jimmy", "email": "email is 1123@gmail.com" }
//   }
// }

// {
//   "content": "This is the reply to your comment",
//   "replyingTo": "Reply to this person",
//   "user": { "image": "image location", "name": "user name is Jimmy", "email": "email is 1123@gmail.com" }
// }