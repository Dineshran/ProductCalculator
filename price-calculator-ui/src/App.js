import './App.css';
import React from 'react';
import Dashboard from "./pages/Dashboard";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import SignInSide from "./pages/SignInSide";

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path={"/login"} component={SignInSide}></Route>
            <Route exact path={"/"} component={SignInSide}></Route>
            <Route path={"/dashboard"} component={Dashboard}></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
