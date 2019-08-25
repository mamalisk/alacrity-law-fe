import * as React from "react";
import { useMutation } from "react-apollo-hooks";
import { CREATE_NEW_BOOK } from "./mutation";
import TextField from "@material-ui/core/TextField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

const CreateBookForm = (props: { history: any }) => {
  const classes = useStyles();
  const [title, setTitle] = React.useState<string>();
  const [author, setAuthor] = React.useState<string>();
  const [price, setPrice] = React.useState<number>();
  const [createNewBook] = useMutation(CREATE_NEW_BOOK, {
    variables: { title, author, price }
  });

  const isEmptyString = (s?: string) => {
    return !s || s === "";
  };

  const onClick = (e: any) => {
    e.preventDefault();
    const emptyStrings = [title, author]
      .map(_ => isEmptyString(_))
      .reduce((a, b) => a || b, false);
    const isZeroOrNegativePrice = !price || price === 0 || price < 0;
    if (emptyStrings || isZeroOrNegativePrice) {
      alert("Values were not valid!");
    } else {
      createNewBook().then(_ => {
        window.location.replace("/");
      });
    }
  };

  const cancel = (e: any) => {
    e.preventDefault();
    props.history.push("/");
  };

  return (
    <div className="create-book-form">
      <TextField
        required
        id="title"
        label="Title"
        className={classes.textField}
        onChange={e => setTitle(e.currentTarget.value)}
        margin="normal"
      />
      <TextField
        required
        id="author"
        label="Author"
        className={classes.textField}
        onChange={e => setAuthor(e.currentTarget.value)}
        margin="normal"
      />
      <TextField
        required
        id="price"
        label="Price"
        type="number"
        className={classes.textField}
        onChange={e => setPrice(Number(e.currentTarget.value))}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onClick}
      >
        Create
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={cancel}
      >
        Cancel!
      </Button>
    </div>
  );
};

export default withRouter(CreateBookForm);
