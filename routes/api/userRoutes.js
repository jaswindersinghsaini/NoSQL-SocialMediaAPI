const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// get all users /api/user
router.route('/').get(getUsers).post(createUser);

//  get single user and updateand delete /api/user/:userId
router.route('/:Id').get(getSingleUser).put(updateUser).delete(deleteUser);

//  add, remove friend /api/user/:userId/friends/:friendsId
router.route('/:Id/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;
