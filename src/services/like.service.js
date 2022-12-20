const LikeRepository = require('../repositories/like.repository');
const {checkIdPattern} = require('../validations/uri.validation');

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  changeLike = async (postId, userId) => {
    await checkIdPattern.validateAsync(postId);

    try {
      if (!(await this.likeRepository.existPost(postId)))
        return { errorMessage: '존재하지 않는 게시글', code: 400 };

      await this.likeRepository.changeLike(postId, userId);
      return { message: '등록 완료', code: 200 };
    } catch (e) {
      if (e === 'already') return { message: '취소 완료', code: 200 };
      else throw e;
    }
  };
}
module.exports = LikeService;
