const gql = require("graphql-tag");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    location: String
    icon: Int
    blogposts: [Blogpost]
  }

  type Blogpost {
    _id: ID
    blogpostText: String
    blogpostAuthor: User
    imageUrl: String
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
    user(username: String!): User
    me: User
    blogposts(username: String): [Blogpost]
    blogpost(blogpostId: ID!): Blogpost
  }

  type Mutation {
    addUser(email: String!, username: String!, location: String!, password: String!, icon: Int!): Auth
    editUser(email: String!, location: String!, icon: Int!): Auth
    login(email: String!, password: String!): Auth
    addBlogpost(blogpostText: String!, imageUrl: String): Blogpost
    addComment(blogpostId: ID!, commentText: String!): Blogpost
    removeBlogpost(blogpostId: ID!): Blogpost
    removeComment(blogpostId: ID!, commentId: ID!): Blogpost
  }
`;
module.exports = typeDefs;
