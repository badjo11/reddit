import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";
import RoomsPage from "./pages/RoomsPage";
import RoomsContextProvider from "./contexts/RoomsContext";

const Routes = () => {
  return (
    <MainContextProvider>
      <RoomsContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/r/:roomtitle" component={RoomsPage} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </RoomsContextProvider>
    </MainContextProvider>
  );
};

export default Routes;
