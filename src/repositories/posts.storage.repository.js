const s3 = require('../config/s3');

class PostsStorageRepository {
  deleteImage = async (imageKey) => {
    await s3.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
    });
  };
}

module.exports = PostsStorageRepository;
