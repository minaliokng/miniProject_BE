const LikeRepository = require('../repositories/like.repository');
const { ApiError } = require('../utils/apiError');
const { checkIdPattern } = require('../validations/uri.validation');

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  changeLike = async (postId, userId) => {
    await checkIdPattern.validateAsync(postId);

    if (!(await this.likeRepository.existPost(postId))) throw new ApiError('존재하지 않는 게시글', 400);

    return await this.likeRepository.changeLike(postId, userId);
  };
}
module.exports = LikeService;
