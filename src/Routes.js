import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";

const Routes = () => {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </MainContextProvider>
  );
};

export default Routes;
