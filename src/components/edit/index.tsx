import * as React from 'react';
import gql from "graphql-tag";
import EditBookForm from './edit-book';
import { useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

const GET_BOOK_TO_EDIT = gql`
  {
    bookToEdit @client {
      bookId
      title
      author
      price
    }
  }
`;


const EditContainer = (props: { history: any; }) => {
  const { data } =  useQuery(GET_BOOK_TO_EDIT);
  if(!data || !data.bookToEdit) return <div>an error occured...</div>;
  
  const book = data.bookToEdit;
  return <EditBookForm book={book} history={props.history}/>;
};

export default withRouter(EditContainer);
