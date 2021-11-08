import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainContextProvider from "./contexts/MainContext";
import RoomsPage from "./pages/RoomsPage";
import RoomsContextProvider from "./contexts/RoomsContext";
import PostsContextProvider from "./contexts/PostsContext";
import Navibar from "./components/Navibar";
import CommentsPage from "./pages/CommentsPage";
import VotesContextProvider from "./contexts/VoteContext";
import CommentsContextProvider from "./contexts/CommentsContext";
import AllRooms from "./pages/AllRooms";
import NoMatch from "./pages/NoMatch";

const MyRoutes = () => {
  return (
    <MainContextProvider>
      <RoomsContextProvider>
        <PostsContextProvider>
          <CommentsContextProvider>
            <VotesContextProvider>
              <BrowserRouter>
                <Navibar />
                <Routes>
                  <Route exact path="/" element={<MainPage />} />
                  <Route exact path="/r/:roomtitle" element={<RoomsPage />} />
                  <Route
                    exact
                    path="/r/:roomtitle/comments/:id"
                    element={<CommentsPage />}
                  />
                  <Route path='/rooms' element={<AllRooms />} />
                  <Route path='*' element={<NoMatch />} />
                </Routes>
              </BrowserRouter>
            </VotesContextProvider>
          </CommentsContextProvider>
        </PostsContextProvider>
      </RoomsContextProvider>
    </MainContextProvider>
  );
};

export default MyRoutes;
