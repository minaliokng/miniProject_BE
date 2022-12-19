const LikeService = require('../services/like.service');

class LikeController {
  constructor() {
    this.likeService = new LikeService();
  }

  saveLike = async(req, res, next) => {
    const result = await this.likeService.saveLike(req.body);
    const messageType = Object.keys(result)[0];
    res.status(result.code).json({messageType: result[messageType]});
  }

  cancleLike = async(req, res, next) => {
    const result = await this.likeService.cancleLike(req.body);
    const messageType = Object.keys(result)[0];
    res.status(result.code).json({messageType: result[messageType]});
  }
}

module.exports = LikeController;
