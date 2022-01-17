const { AuthenticationError } = require("apollo-server-express");
const { User, Product, Category, List } = require("../models");
const { signToken } = require("../utils/auth");
const krogerFetch = require("../utils/KrogerAPI");


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: "lists.products",
                    populate: "category",
                });
                return user;
            }

            throw new AuthenticationError("User not logged in");
        },
        krogerSearch: async (parent, args) => {
            try {
                console.log(args);
                if (!args.term) {
                    return;
                }
                const krogerData = await krogerFetch(args.term);
                console.log(krogerData);
                let outputData = [];
                krogerData.forEach(data => {
                    console.log(JSON.stringify(data, null, 2));

                    let item = {
                        productId: data.productId,
                        description: data.description,
                        image: data.images[0].sizes[0].url,
                        category: data.categories[0],
                    }
                    outputData.push(item);
                });
                return outputData;
            } catch (err) {
                console.log(err);
            }
        }

    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }

            throw new AuthenticationError("User not logged in");
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Please enter valid credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Please enter valid credentials");
            }

            const token = signToken(user);

            return { token, user };
        },
    }

}

module.exports = resolvers;