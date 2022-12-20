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
      console.log(result)
      const messageType = Object.keys(result)[0];
      res.status(result.code).json({messageType: result[messageType]});
    }
    catch (err){
      next(err);
    }
  }
}

module.exports = LikeController;
