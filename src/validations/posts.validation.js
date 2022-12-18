const Joi = require('joi');

exports.createPost = {
  input: Joi.object().keys({
    postInput: Joi.object().keys({
      title: Joi.string().max(50).required(),
      imageUrl: Joi.string().required(),
      content: Joi.string().max(1000).required(),
      categoryId: Joi.number().min(0).max(4).required(),
    }),
    userId: Joi.number().integer().min(1).required(),
  }),
};

exports.getPosts = {
  input: Joi.object().keys({
    categoryId: Joi.number().min(0).max(4).required(),
    page: Joi.number().min(1).default(1),
    userId: Joi.number().integer().min(1),
  }),
  output: Joi.object().keys({
    pagesNum: Joi.number().required(),
    posts: Joi.array().items(
      Joi.object().keys({
        postId: Joi.number().required(),
        title: Joi.string().required(),
        imageUrl: Joi.string().required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date().required(),
        isLiked: Joi.number().required(),
        userNickname: Joi.string().required(),
        userId: Joi.number().required(),
      }),
    ),
  }),
};

exports.getPost = {
  input: Joi.object().keys({
    postId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1),
  }),
  output: Joi.object().keys({
    postId: Joi.number().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
    imageUrl: Joi.string().required(),
    createdAt: Joi.date().required(),
    updatedAt: Joi.date().required(),
    isLiked: Joi.number().required(),
    likesNum: Joi.number().required(),
    userNickname: Joi.string().required(),
    userId: Joi.number().required(),
  }),
};

exports.updatePost = {
  input: Joi.object().keys({
    postId: Joi.number().integer().min(1).required(),
    postInput: Joi.object().keys({
      title: Joi.string().max(50).required(),
      imageUrl: Joi.string().required(),
      content: Joi.string().max(1000).required(),
      categoryId: Joi.number().min(0).max(4).required(),
    }),
    userId: Joi.number().integer().min(1).required(),
  }),
};

exports.deletePost = {
  input: Joi.object().keys({
    postId: Joi.number().integer().min(1).required(),
    userId: Joi.number().integer().min(1).required(),
  }),
};
