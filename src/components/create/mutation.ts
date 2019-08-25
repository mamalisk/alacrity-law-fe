import gql from 'graphql-tag';

export const CREATE_NEW_BOOK = gql`
    mutation CreateBook($title: String!, $author: String!, $price: Float!) {
        createBook(title: $title, author: $author, price:$price) {
            bookId
        }
    }
`;