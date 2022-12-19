const { json } = require('express');
const LikeRepository = require('../repositories/Like.repository');

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  saveLike = async (postId, userId) => {
    try {
      if (!await this.likeRepository.existPost(postId))
        return { errorMessage: '존재하지 않는 게시글', code: 404 };

      await this.likeRepository.saveLike(postId, userId);
      return { message: '등록 완료', code: 200 };
    } catch (e) {
      if (e === 'already') return { errorMessage: '이미 좋아요한 글', code: 400 };
    }
  }

  cancleLike = async (body) => {
    if (!await this.likeRepository.existPost(postId))
      return { errorMessage: '존재하지 않는 게시글', code: 404 };

    const { affectedRows } = await this.likeRepository.cancleLike(postId, userId);
    if(affectedRows === 0) return { errorMessage: '좋아요 안 된 글', code: 400 };
    return { message: '취소 완료', code: 200 };
  }
}
module.exports = LikeService;
