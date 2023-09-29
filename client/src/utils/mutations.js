import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $location: String!, $password: String!) {
    addUser(username: $username, email: $email, location: $location, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BLOGPOST = gql`
  mutation addBlogpost($blogpostText: String!) {
    addBlogpost(blogpostText: $blogpostText) {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($blogpostId: ID!, $commentText: String!) {
    addComment(blogpostId: $blogpostId, commentText: $commentText) {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_BLOGPOST = gql`
  mutation removeBlogpost($blogpostId: ID!) {
    removeBlogpost(blogpostId: $blogpostId) {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;