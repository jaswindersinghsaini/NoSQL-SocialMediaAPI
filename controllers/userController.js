const User = reuire('../models/User');

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
            const user = await User.findOne({_id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            if(user){
                res.json(user);
            } else {
                res.status(404).json({ 
                        message: 'No User found with the provided ID',
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



    module.exports = {
        getUsers,
        getSingleUser,
        createUser,
}