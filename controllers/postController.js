const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, user: req.user._id });
  res.json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('user', 'username');
  res.json(posts);
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: 'Forbidden' });

  post.title = req.body.title;
  post.content = req.body.content;
  await post.save();
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post.user.toString() !== req.user._id.toString())
    return res.status(403).json({ error: 'Forbidden' });

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};
