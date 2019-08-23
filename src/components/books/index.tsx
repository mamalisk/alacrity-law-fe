import * as React from 'react';
import {useAllBooksQuery} from '../../generated/graphql';
import Books from './listOfBooks';
import { withRouter } from 'react-router-dom';

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

    return <Books data={data} history={props.history}/>;
}

export default withRouter(BooksContainer);
