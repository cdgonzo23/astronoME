import { gql } from "@apollo/client";

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
  mutation addUser($username: String!, $email: String!, $location: String!, $password: String!, $icon: String!) {
    addUser(username: $username, email: $email, location: $location, password: $password, icon: $icon) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($email: String!, $location: String!, $icon: String!) {
    editUser(email: $email, location: $location, icon: $icon) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_BLOGPOST = gql`
  mutation addBlogpost($blogpostText: String!, $imageUrl: String) {
    addBlogpost(blogpostText: $blogpostText, imageUrl: $imageUrl) {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      imageUrl
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
