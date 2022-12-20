const CommentsRepository = require('../repositories/comments.repository');

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  postComment = async (postId, userId, content) => {
    try {
      const existPost = await this.commentsRepository.existPost(postId);
      if (!existPost) return { errorMessage: '존재하지 않는 게시글', code: 404 };
      await this.commentsRepository.postComment(postId, userId, content);
      return { messsage: '작성 완료', code: 201 };
    }
    catch {
      return { errorMessage: '댓글 형식이 아님', code: 400 }
    }
  }

  getComments = async (postId, page) => {
    try{
      const existPost = await this.commentsRepository.getComments(postId);
      if (!existPost) return { errorMessage: '존재하지 않는 게시글', code: 404 };
      return existPost
    }
    catch{
      return {errorMessage: '유효한 쿼리 아님', code: 400}
    }
  }
}

module.exports = CommentsService;
