import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";
import RoomsPage from "./pages/RoomsPage";
import RoomsContextProvider from "./contexts/RoomsContext";
import PostsContextProvider from "./contexts/PostsContext";
import Navibar from "./components/Navibar";
import CommentsPage from "./pages/CommentsPage";
import VotesContextProvider from "./contexts/VoteContext";
import CommentsContextProvider from "./contexts/CommentsContext";

const Routes = () => {
  return (
    <MainContextProvider>
      <RoomsContextProvider>
        <PostsContextProvider>
          <CommentsContextProvider>
            <VotesContextProvider>
              <BrowserRouter>
                <Navibar />
                <Switch>
                  <Route exact path="/" component={MainPage} />
                  <Route exact path="/r/:roomtitle" component={RoomsPage} />
                  <Route
                    exact
                    path="/r/:roomtitle/comments/:id"
                    component={CommentsPage}
                  />
                  <Redirect to="/" />
                </Switch>
              </BrowserRouter>
            </VotesContextProvider>
          </CommentsContextProvider>
        </PostsContextProvider>
      </RoomsContextProvider>
    </MainContextProvider>
  );
};

export default Routes;
