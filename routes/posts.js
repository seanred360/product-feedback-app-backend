const express = require("express");
const router = express.Router();
const Post = require("../models/post");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ messgae: err });
  }
});

// CREATE ONE
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    description: req.body.description,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//GET SPECIFIC POST
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//DELETE A SPECIFIC POST
router.delete("/:id", async (req, res) => {
  try {
    const removedPost = await Post.deleteOne({ _id: req.params.id });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//EDIT A POST
router.patch("/edit/:slug", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { slug: req.params.slug },
      {
        $set: {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          slug: req.body.title,
        },
      }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD A COMMENT
router.patch("/postcomment/:slug", async (req, res) => {
  try {
    const newComment = await Post.updateOne(
      { slug: req.params.slug },
      { $push: { comments: req.body } }
    );
    res.json(newComment);
  } catch (err) {
    res.json({ message: err });
  }
});

//ADD AN UPVOTE
router.patch("/postupvote/:id", async (req, res) => {
  try {
    const addUpvote = await Post.updateOne(
      { _id: req.params.id },
      { $addToSet: { upvotes: req.body } }
    );
    console.log(addUpvote);
    res.json(addUpvote);
  } catch (err) {
    res.json({ message: err });
  }
});

//REMOVE AN UPVOTE
router.patch("/removeupvote/:id", async (req, res) => {
  try {
    const removeUpvote = await Post.updateOne(
      { _id: req.params.id },
      { $pull: { upvotes: { $in: req.body } } }
    );
    res.json(removeUpvote);
  } catch (err) {
    res.json({ message: err });
  }
});

//REPLY TO A COMMENT
router.patch("/postreply/:id", async (req, res) => {
  try {
    const newReply = await Post.updateOne(
      { "comments._id": req.params.id },
      { $push: { "comments.$[elem].replies": req.body } },
      { arrayFilters: [{ "elem._id": req.params.id }] }
    );
    res.json(newReply);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

//ADD AN UPVOTE OR UNDO A PREVIOUS UPVOTE
// router.patch("/upvote/:id", async (req, res) => {
//   const post = await Post.findById(req.params.id);

//   if (post.upvotes.includes(req.body)) {
//     try {
//       const removeUpvote = await Post.updateOne(
//         { _id: req.params.id },
//         { $pull: { upvotes: { $in: req.body } } }
//       );
//       res.json({ response: removeUpvote, message: "upvote" });
//     } catch (err) {
//       res.json({ message: err });
//     }
//   } else {
//     try {
//       const addUpvote = await Post.updateOne(
//         { _id: req.params.id },
//         { $addToSet: { upvotes: req.body } }
//       );
//       res.json(addUpvote);
//     } catch (err) {
//       res.json({ message: err });
//     }
//   }
// });
