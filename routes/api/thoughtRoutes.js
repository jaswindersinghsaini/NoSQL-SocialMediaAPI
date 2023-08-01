const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updatethought,
  deleteThought,
  createReaction,
  deleteReaction
  
  
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:Id
router.route('/:Id').get(getSingleThought).put(updatethought).delete(deleteThought);

// /api/thought/:Id/reactions
router.route('/:Id/reactions').post(createReaction);

// /api/thought/:Id/reactions/:reactionId
router.route('/:Id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
