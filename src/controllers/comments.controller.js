const CommentsService = require('../services/comments.service');

class CommentsController {
  constructor() {
    this.commentsService = new CommentsService();
  }

  postComment = async(req, res) => {
    const {postId} = req.params;
    const {content} = req.body;
    const {userId} = res.locals

    const result = await this.commentsService.postComment(postId, userId, content);
    const messageType = Object.keys(result)[0];
    res.status(result.code).json({messageType: result[messageType]});
  }

  getComments = async(req, res) => {
    const {postId} = req.params
    const {page} = req.query
    
    const comments = await this.commentsService.getComments(postId, page);
    console.log(comments.length)
    return res.send(comments)
  }
}

module.exports = CommentsController;
