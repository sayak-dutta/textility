import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#222831";
      document.body.style.color = "white";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  };

  return (
    <>
      <Router>
        <Navbar titleText="Textility" mode={mode} toggleMode={toggleMode} />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <TextForm mode={mode} toggleMode={toggleMode} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
