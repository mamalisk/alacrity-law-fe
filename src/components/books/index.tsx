import * as React from 'react';
import {useAllBooksQuery} from '../../generated/graphql';
import Books from './listOfBooks';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const BooksContainer = (props: { history: any; }) => {
    const {data, error ,loading } = useAllBooksQuery();

    if(loading) {
        return <div className="loading">Loading...</div>;
    }

    if(error || !data) {
        console.error(error);
        console.info('data', data);
        return <div className="error">Error occured.</div>
    }

    return <>
            <Button variant="contained" color="primary" onClick={() => props.history.push('/create')}>
                Create new Book
            </Button>
            <Books data={data} history={props.history}/>
            </>;
}

export default withRouter(BooksContainer);
