const { User, Thought } = require("../models");

// Get all Users
async function getUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get Single User
async function getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.Id })
    .select('__v') 
    .populate('thoughts')
    .populate('friends');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({
        message: "No User found with the provided ID",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

//Create a new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Update a user

async function updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.Id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this ID" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete User and thoughts
async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.Id });
    if (!user) {
      res.status(404).json({ message: "No user with this ID" });
    } else {
      res.json({ message: "User Deleted" });
      Thought.deleteMany({ _id: { $in: user.thoughts } });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Add Friend to user

async function addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.Id },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this ID" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Remove Friend
async function removeFriend(req, res) {
  try {
    const user = await User.findOneAndRemove(
      { _id: req.params.Id },
      { $pull: { friends: { friendsId: req.params.friendId } } },
      { runValidators: true, new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this ID" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
