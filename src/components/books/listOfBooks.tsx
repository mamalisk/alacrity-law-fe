import React from "react";
import clsx from "clsx";
import { AllBooksQuery, Book } from "../../generated/graphql";
import { useApolloClient } from '@apollo/react-hooks';

import {
  createStyles,
  lighten,
  makeStyles,
  Theme
} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

interface BooksProps {
  data: AllBooksQuery;
  history: any;
}

interface HeadRow {
  disablePadding: boolean;
  id: keyof Book;
  label: string;
  numeric: boolean;
}

const headRows: HeadRow[] = [
  { id: "bookId", numeric: false, disablePadding: true, label: "ID" },
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  { id: "author", numeric: false, disablePadding: false, label: "Author" },
  { id: "price", numeric: true, disablePadding: false, label: "Price (£)" }
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  totalPrice: number;
  onSelectAllClick: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding={row.disablePadding ? "none" : "default"}
          >
            {row.label}
          </TableCell>
        ))}
        <TableCell padding="default" />
        <TableCell padding="default">
            
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85)
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark
          },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary
    },
    title: {
      flex: "0 0 auto"
    }
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  totalPrice: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected, totalPrice } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected of total price £{totalPrice.toFixed(2)}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Books
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3)
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2)
    },
    table: {
      minWidth: 750
    },
    tableWrapper: {
      overflowX: "auto"
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1
    }
  })
);

export default function EnhancedTable(props: BooksProps) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [dense, setDense] = React.useState(false);
  const rows = props.data!.books as [Book];
  const client = useApolloClient();

  function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      const newSelecteds = props.data!.books!.map(b => b!.title);
      const totalPrice = props
        .data!.books!.map(_ => _!.price)
        .reduce((a, b) => a + b, 0);
      setSelected(newSelecteds);
      setTotalPrice(totalPrice);
      return;
    }
    setSelected([]);
    setTotalPrice(0);
  }

  function handleClick(
    event: React.MouseEvent<unknown>,
    name: string,
    price: number
  ) {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      setTotalPrice(totalPrice + price);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setTotalPrice(totalPrice - price);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      setTotalPrice(totalPrice - price);
    } else if (selectedIndex > 0) {
      setTotalPrice(totalPrice - price);
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangeDense(event: React.ChangeEvent<HTMLInputElement>) {
    setDense(event.target.checked);
  }

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Typography variant="h3" id="pageTitle">
        List of all Available Books
      </Typography>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          totalPrice={totalPrice}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
              totalPrice={totalPrice}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.title);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.title, row.price)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.bookId}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.bookId}
                    </TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.author}</TableCell>
                    <TableCell align="left">£{row.price}</TableCell>
                    <TableCell align="center">
                        <EditIcon onClick={() => {
                            client.writeData({ data: { bookToEdit: row } });
                            localStorage.setItem('bookToEdit', JSON.stringify(row))
                            props.history.push('/edit');
                        }
                    }/>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
