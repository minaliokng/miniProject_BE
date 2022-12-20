const { nextTick } = require('process');
const LikeService = require('../services/like.service');

class LikeController {
  constructor() {
    this.likeService = new LikeService();
  }

  changeLike = async(req, res, next) => {
    const {postId} = req.params;
    const {userId} = res.locals;

    try{
      const result = await this.likeService.changeLike(postId, userId);
      
      if(result) res.status(200).json({message: '등록 완료'});
      else res.status(200).json({message: '취소 완료'});
    }
    catch (err){
      next(err);
    }
  }
}

module.exports = LikeController;
