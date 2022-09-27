import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./NavBar";
import Content from "./Content";

import "../Styles/App.css";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Content />
    </Router>
  );
};

export default App;
