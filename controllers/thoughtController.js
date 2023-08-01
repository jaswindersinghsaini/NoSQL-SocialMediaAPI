const { User, Thought } = require("../models");
const { ObjectId } = require("mongoose").Types;

// Get all thoughts

async function getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get Single Thought by id

async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.Id });

    if (!thought) {
      res.status(404).json({ message: "No Thought for this Id" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Create thought to a user

async function createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);

    if (thought) {
      return User.findByIdAndUpdate(
          { _id: req.params.Id },
          { $push: { thoughts: thought._id } },
          { new: true }
        ),
        res.json({ message: "Thought created successfully!!" })

    } else {
      res.json({message: "No thoughts created!!"});
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// update Thought

async function updatethought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.Id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought with this ID" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Delete thought

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.Id });
    if (!thought) {
      res.status(404).json({ message: "No thought with this ID" });
    } else {
      return User.findByIdAndUpdate(
        { _id: req.params.Id },
        { $pull: { thoughts: thought._id } },
        { new: true }
      ),
      res.json({message: "User and thoughts deleted!"})
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// Create reaction

async function createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.Id },
        { $set: { reactions: req.body } },
        { runValidators: true, new: true }
        
        );
      if (!thought) {
        res.status(404).json({ message: "No thought with this ID" });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete Reaction

  async function deleteReaction(req, res){
    try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.Id },
        { $pull: {reactions: { reactionId: req.params.reactionId}}},
        {runValidators: true, new: true }
        
      )
      if (!thought) {
        return res.status(404).json({ message: 'No Thought with this ID!' });
      } else {
      res.json(thought);
    }

    } catch (err) {
        res.json(500).json(err);
    }
  }

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updatethought,
  deleteThought,
  createReaction,
  deleteReaction
};
