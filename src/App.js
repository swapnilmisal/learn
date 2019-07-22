import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Snack from "./components/Snack";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Search from "./components/Search";
import repo from "./reducers/repo";
import { createStore } from "redux";

const store = createStore(repo);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Snack />
        <Nav />
        <Route exact path="/" component={Card} />
        <Route path="/search" component={Search} />
      </Router>
    </Provider>
  );
}

export default App;
