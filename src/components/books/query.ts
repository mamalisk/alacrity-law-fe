import gql from 'graphql-tag';

export const QUERY_BOOKS = gql`

  query AllBooks {
    books {
        bookId,
        title,
        author,
        price
    }
  }
`;
