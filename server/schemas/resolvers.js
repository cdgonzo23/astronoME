const { AuthenticationError } = require("@apollo/server");
const { User, Blogpost } = require("../models");
const { signToken } = require("../utils/auth");
const { countDocuments } = require("../models/User");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate({
        path: "blogposts",
        options: { sort: { createdAt: -1 } },
      });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "blogposts",
          options: { sort: { createdAt: -1 } },
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    blogposts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Blogpost.find(params).sort({ createdAt: -1 });
    },
    blogpost: async (parent, { blogpostId }) => {
      return Blogpost.findOne({ _id: blogpostId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, location, password }) => {
      const user = await User.create({ username, email, location, password });
      const token = signToken(user);

      return { token, user };
    },
    editUser: async (parent, { email, location }, context) => {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { email, location },
          { new: true }
        );
        const token = signToken(updatedUser)
        return { token, updatedUser };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addBlogpost: async (parent, { blogpostText, imageUrl }, context) => {
      if (context.user) {
        const blogpost = await Blogpost.create({
          blogpostText,
          blogpostAuthor: context.user.username,
          blogpostLocation: context.user.location,
          imageUrl: imageUrl,
          userId: context.user._id,
        });
        await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { blogposts: blogpost._id } });
        return blogpost;
      }
      throw AuthenticationError;
      ("You need to be logged in!");
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
        await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { blogposts: blogpost._id } });
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
  },
};
module.exports = resolvers;
