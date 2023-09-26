const gql = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    location: String
  }

  type Blogpost {
    _id: ID
    blogpostText: String
    blogpostAuthor: String
    blogpostLocation: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(id: ID!): User
    me: User
  }

  type Mutation {
    addUser(email:String!, username:String!, password:String!): Auth
    login(email:String!, password:String!): Auth
    addBlogpost(blogpostText: String!): Blogpost
    addComment(blogpostId: ID!, commentText: String!): Blogpost
    removeBlogpost(blogpostId: ID!): Blogpost
    removeComment(blogpostId: ID!, commentId: ID!): Blogpost
  }
`;

module.exports = typeDefs;

