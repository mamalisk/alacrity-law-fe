import * as React from 'react';
import gql from "graphql-tag";
import { Book } from '../../generated/graphql';
import EditBookForm from './edit-book';




const EditContainer: React.FC = () => {
  const valueFormLocalStorage = localStorage.getItem('bookToEdit');
  if(!valueFormLocalStorage) return <div>an error occured...</div>;
  const book = JSON.parse(valueFormLocalStorage!) as Book;
  const editBook = () => {};
  // const { data } = useQuery(GET_BOOK_TO_EDIT);
  // const [editBook, { loading, error }] = useMutation(
  //   EDIT_BOOK,
  //   {
  //     onCompleted({ book }) {
  //       localStorage.setItem('editedBook', book);
  //       client.writeData({ data: book });
  //     }
  //   }
  // );

  // if (loading) return <div>Loading...</div>;
  // if (error) return <p>An error occurred</p>;
  return <EditBookForm book={book} onSubmit={() => {editBook()}}/>;
};

export default EditContainer;
