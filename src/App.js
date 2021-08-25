import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TextForm from "./components/TextForm";
import About from "./components/About";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const sendAlert = (messege, type) => {
    setAlert({
      msg: messege,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#222831";
      document.body.style.color = "white";
      sendAlert("Dark Mode has been turned On", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      sendAlert("Light Mode has been turned On", "success");
    }
  };

  return (
    <>
      <Router>
        <Navbar titleText="Textility" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <TextForm mode={mode} toggleMode={toggleMode} sendAlert={sendAlert} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
