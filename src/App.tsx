import React from 'react';
import './App.css';
import BooksContainer from './components/books';
import { Route, RouteComponentProps } from 'react-router';
import EditContainer from './components/edit';

const App: React.FC = () => {
  return (
    <div className="App">
      <Route exact path="/" component={(props: RouteComponentProps) => <BooksContainer />}/>
      <Route exact path="/edit" component={(props: RouteComponentProps) => <EditContainer />}/>
      <Route exact path="/create" component={(props: RouteComponentProps) => <div>create</div>}/>
    </div>
  );
}

export default App;
