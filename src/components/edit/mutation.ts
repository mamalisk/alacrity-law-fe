import gql from 'graphql-tag';

export const EDIT_BOOK = gql`
    mutation EditBook($bookId: Int!, $title: String!, $author: String!, $price: Float!) {
        editBook(bookId: $bookId, title: $title, author: $author, price:$price) {
            bookId
        }
    }
`;