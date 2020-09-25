import React from 'react';
import {Route, Switch} from "react-router-dom";

import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";

import './App.css';

function App() {
  return (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/movie/:id' component={MovieDetail}/>
        </Switch>
    </main>
  );
}

export default App;
