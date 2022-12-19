const LikeService = require('../services/like.service');

class LikeController {
  constructor() {
    this.likeService = new LikeService();
  }

  saveLike = async(req, res, next) => {
    const postId = req.params;
    const userId = req.body
    const result = await this.likeService.saveLike(postId, userId);
    const messageType = Object.keys(result)[0];
    res.status(result.code).json({messageType: result[messageType]});
  }

  cancleLike = async(req, res, next) => {
    const postId = req.params;
    const userId = req.body
    const result = await this.likeService.cancleLike(postId, userId);
    const messageType = Object.keys(result)[0];
    res.status(result.code).json({messageType: result[messageType]});
  }
}

module.exports = LikeController;
