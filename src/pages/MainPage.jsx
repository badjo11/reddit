import React, { useContext, useEffect } from "react";
import Navibar from "../components/Navibar";
import MainPS from "../components/pageScructure/mainPage/MainPS";

const MainPage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Navibar />
      <MainPS></MainPS>
    </>
  );
};

export default MainPage;
