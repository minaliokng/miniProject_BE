const CommentsService = require('../services/comments.service');

class CommentsController {
  constructor() {
    this.commentsService = new CommentsService();
  }

  postComment = async(req, res, next) => {
    const {postId} = req.params;
    const {content} = req.body;
    const {userId} = res.locals;

    try{
      const result = await this.commentsService.postComment(postId, userId, content);
      
      return res.status(201).json({message: "작성 완료", comment: result});
    }
    catch (err) {
      next(err);
    }
  }

  getComments = async(req, res, next) => {
    const {postId} = req.params
    const {page} = req.query
    
    try{
      const {results, maxLength } = await this.commentsService.getComments(postId, page);
      return res.status(200).json({pagesNum: maxLength, comments: results})
    }
    catch (err) {
      next(err);
    }
  }

  updateComment = async(req, res, next) => {
    const {commentId} = req.params;
    const {content} = req.body;
    const {userId} = res.locals;

    try{
      const result = await this.commentsService.updateComment(commentId, userId, content);
      
      return res.status(200).json({message: "수정 완료"});
    }
    catch (err) {
      next(err);
    }
  }

  deleteComment = async(req, res, next) => {
    const {userId} = res.locals;
    const {commentId} = req.params;

    try{
      await this.commentsService.deleteComment(commentId, userId);

      return res.status(200).json({message: "삭제 완료"});
    }
    catch (err) {
      next(err);
    }
  }
}

module.exports = CommentsController;
