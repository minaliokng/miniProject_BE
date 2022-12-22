const CommentsRepository = require('../repositories/comments.repository');
const { ApiError } = require('../utils/apiError');
const { checkIdPattern } = require('../validations/uri.validation');

class CommentsService {
  constructor() {
    this.commentsRepository = new CommentsRepository();
  }

  postComment = async (postId, userId, content) => {
    await checkIdPattern.validateAsync(postId);

    const existPost = await this.commentsRepository.existPost(postId);
    if (!existPost) throw new ApiError('존재하지 않는 게시글', 400);

    if (content === '' || content.trim() === '')
      throw new ApiError('댓글 내용 없음', 400);

    const { commentId } = await this.commentsRepository.postComment(
      postId,
      userId,
      content,
    );
    const [comment] = await this.commentsRepository.getComments(commentId, 1);

    return comment;
  };

  getComments = async (postId, page) => {
    await checkIdPattern.validateAsync(postId);

    const existPost = await this.commentsRepository.existPost(postId);
    if (!existPost) throw new ApiError('존재하지 않는 게시글', 400);

    const comments = await this.commentsRepository.getComments(postId, 0);
    let maxLength = parseInt(comments.length / 5);
    if (comments.length % 5 != 0) maxLength++;

    if (!page) page = 1;
    else if (page > maxLength) page = maxLength;

    const results = comments.slice((page - 1) * 5, page * 5);

    return { results, maxLength };
  };

  updateComment = async (commentId, userId, content) => {
    await checkIdPattern.validateAsync(commentId);

    const existComment = await this.commentsRepository.existComment(commentId);
    if (!existComment) throw new ApiError('존재하지 않는 댓글', 400);

    if (userId !== existComment.userId)
      throw new ApiError('사용자 정보 불일치', 403);

    if (content === '' || content.trim() === '')
      throw new ApiError('댓글 내용 없음', 400);

    await this.commentsRepository.updateComment(commentId, content);
  };

  deleteComment = async (commentId, userId) => {
    await checkIdPattern.validateAsync(commentId);

    const existComment = await this.commentsRepository.existComment(commentId);
    if (!existComment) throw new ApiError('존재하지 않는 댓글', 400);

    if (userId !== existComment.userId)
      throw new ApiError('사용자 정보 불일치', 403);

    await this.commentsRepository.deleteComment(commentId);
  };
}

module.exports = CommentsService;
