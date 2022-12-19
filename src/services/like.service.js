const { json } = require('express');
const LikeRepository = require('../repositories/Like.repository');

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  changeLike = async (postId, userId) => {
    try{
      if (!await this.likeRepository.existPost(postId))
        return { errorMessage: '존재하지 않는 게시글', code: 404 };

      await this.likeRepository.changeLike(postId, userId);
      return { message: '등록 완료', code: 200 };
    }
    catch (e) {
      if (e === 'already') return { message: '취소 완료', code: 200 };
    }
  }
}
module.exports = LikeService;
