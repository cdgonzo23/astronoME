import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      location
      blogposts {
        _id
        blogpostText
        blogpostAuthor
        blogpostLocation
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      location
      blogposts {
        _id
        blogpostText
        blogpostAuthor
        blogpostLocation
        createdAt
      }
    }
  }
`;

export const QUERY_BLOGPOSTS = gql`
  query blogposts {
    blogposts {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      createdAt
    }
  }
`

export const QUERY_SINGLE_BLOGPOST = gql`
  query blogpost($blogpostId: ID!) {
    blogpost(blogpostId: $blogpostId) {
      _id
      blogpostText
      blogpostAuthor
      blogpostLocation
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;