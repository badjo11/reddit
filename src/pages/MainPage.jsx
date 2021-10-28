import React, { useContext, useEffect } from "react";
import MyCard from "../components/myCard";
import { mainContext } from "../contexts/MainContext";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navibar from "../components/Navibar";

const MainPage = () => {
  const { posts } = useContext(mainContext);
  useEffect(() => {}, []);
  return <Navibar />;
};

export default MainPage;
