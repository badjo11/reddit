import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";
import RoomsPage from "./pages/RoomsPage";

const Routes = () => {

  return (
    <MainContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/r" component={RoomsPage} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </MainContextProvider>
  );
};

export default Routes;
