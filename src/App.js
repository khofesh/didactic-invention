import React from "react";
// import logo from "./logo.svg";
// import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./app/pages/Home";
import MovieDetail from "./app/pages/MovieDetail";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path={"/movie-detail/:imdbID"}>
            <MovieDetail />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
