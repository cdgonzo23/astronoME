const { AuthenticationError } = require('@apollo/server');
const { User } = require('../models');
const { Blogpost } = require('../models/');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addBlogpost: async (parent, { blogpostText }, context) => {
      if (context.user) {
        const blogpost = await Blogpost.create({
          blogpostText,
          blogpostAuthor: context.user.username,
          blogpostLocation: context.user.location,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { blogposts: blogpost._id } }
        );

        return blogpost;
      }
      throw AuthenticationError;
      ('You need to be logged in!');
    },
    addComment: async (parent, { blogpostId, commentText }, context) => {
      if (context.user) {
        return Blogpost.findOneAndUpdate(
          { _id: blogpostId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    removeBlogpost: async (parent, { blogpostId }, context) => {
      if (context.user) {
        const blogpost = await Blogpost.findOneAndDelete({
          _id: blogpostId,
          blogpostAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { blogposts: blogpost._id } }
        );

        return blogpost;
      }
      throw AuthenticationError;
    },
    removeComment: async (parent, { blogpostId, commentId }, context) => {
      if (context.user) {
        return Blogpost.findOneAndUpdate(
          { _id: blogpostId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  }
};

module.exports = resolvers;
