const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const comment = await Comment.create({ ...req.body, user: req.user._id });
  res.json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate('user', 'username');
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (comment.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: 'Forbidden' });

  await comment.deleteOne();
  res.json({ message: 'Comment deleted' });
};
