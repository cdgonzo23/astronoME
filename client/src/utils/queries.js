import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      location
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
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