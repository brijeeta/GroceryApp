const { deleteProduct } = require('../../client/src/utils/API');
const { User } = require('../models');

module.exports = {
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
          $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });
    
        if (!foundUser) {
          return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }
    
        res.json(foundUser);
    },
    async saveProduct({ user, body }, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { lists: body }},
                { new: true, runValidators: true }
            );

            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    async deleteProduct({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { lists: { productId: params.productId }}},
            { new: true }
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: 'Could not find user with this id'});
        }

        return res.json(updatedUser);
    },
};