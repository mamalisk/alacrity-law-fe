import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import { EDIT_BOOK } from './mutation';
import { Book } from '../../generated/graphql';
import TextField from '@material-ui/core/TextField';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

interface EditBookFormProps {
    book: Book;
    history: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing(1),
      },
  }),
);


const EditBookForm: React.FunctionComponent<EditBookFormProps> = (props) => {
 const classes = useStyles();
 const [title, setTitle] = React.useState<string>(props.book.title);
 const [author, setAuthor] = React.useState<string>(props.book.author);
 const [price, setPrice] = React.useState<number>(props.book.price);
 const [editBook] = useMutation(EDIT_BOOK, {
    variables: { bookId: props.book.bookId, title, author, price },
  });

  const isEmptyString = (s? : string) => {
      return !s || s === '';
  }
  
  const onClick = (e: any) => {
      e.preventDefault();
      const emptyStrings = [title, author].map(_ => isEmptyString(_)).reduce((a,b) => a || b, false);
      const isZeroOrNegativePrice = price === 0 || price < 0;
      if(emptyStrings || isZeroOrNegativePrice) {
          alert('Values were not valid!');
      } else {
        editBook().then(_ => {
            window.location.replace('/');
          });
      }
      
  };

  const cancel = (e: any) => {
      e.preventDefault();
      props.history.push('/');
  }

  return (
      <div className='edit-book-form'>
        <TextField
            required
            id="title"
            label="Title"
            defaultValue={props.book.title}
            className={classes.textField}
            onChange={(e)=> setTitle(e.currentTarget.value)}
            margin="normal"
        />
        <TextField
            required
            id="author"
            label="Author"
            defaultValue={props.book.author}
            className={classes.textField}
            onChange={(e)=> setAuthor(e.currentTarget.value)}
            margin="normal"
        />
        <TextField
            required
            id="price"
            label="Price"
            defaultValue={props.book.price + ''}
            type="number"
            className={classes.textField}
            onChange={(e)=> setPrice(Number(e.currentTarget.value))}
            margin="normal"
        />
        <Button variant="contained" color="primary" className={classes.button} onClick={onClick}>
            Edit
        </Button>
        <Button variant="contained" color="secondary" className={classes.button} onClick={cancel}>
            Cancel!
        </Button>
      </div>
  );
};

export default EditBookForm;
