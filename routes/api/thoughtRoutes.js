const router = require('express').Router();
const {
  createFriend,
  deleteFriend,
  
  
} = require('../../controllers/friendController');

// /api/friends
router.route('/').get(getFriends).post(createVideo);

// /api/videos/:videoId
router
  .route('/:videoId')
  .get(getSingleVideo)
  .put(updateVideo)
  .delete(deleteVideo);

  // api/users/:userID/friends/:

// /api/videos/:videoId/responses
router.route('/:videoId/responses').post(addVideoResponse);

// /api/videos/:videoId/responses/:responseId
router.route('/:videoId/responses/:responseId').delete(removeVideoResponse);

module.exports = router;
