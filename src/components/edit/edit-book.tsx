import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { EDIT_BOOK } from './mutation';
import { Book } from '../../generated/graphql';

interface EditBookFormProps {
    book: Book;
    onSubmit: () => void;
}

const EditBookForm: React.FunctionComponent<EditBookFormProps> = (props) => {
 console.log('book was', props.book);
 const [title, setTitle] = React.useState<string>(props.book.title);
 const [editBook, { loading }] = useMutation(EDIT_BOOK, {
    variables: { bookId: props.book.bookId, title: props.book.title, author: props.book.author, price: props.book.price },
  });
  const onClick = (e: any) => {
      e.preventDefault();
      editBook();
  }
  return (
      <div className='edit-book-form'>
        <button onClick={onClick} disabled={loading}>Edit!</button>
      </div>
  );
};

export default EditBookForm;
