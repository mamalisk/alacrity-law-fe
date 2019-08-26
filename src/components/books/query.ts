import gql from 'graphql-tag';

export const QUERY_BOOKS = gql`

  query AllBooks {
    books @client {
        bookId,
        title,
        author,
        price
    }
  }
`;
