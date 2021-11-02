import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";
import RoomsPage from "./pages/RoomsPage";
import RoomsContextProvider from "./contexts/RoomsContext";
import PostsContextProvider from "./contexts/PostsContext";

const Routes = () => {
  return (
    <MainContextProvider>
      <RoomsContextProvider>
        <PostsContextProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/r/:roomtitle" component={RoomsPage} />
              <Redirect to="/" />
            </Switch>
          </BrowserRouter>
        </PostsContextProvider>
      </RoomsContextProvider>
    </MainContextProvider>
  );
};

export default Routes;
