import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };
  const handleTiClick = () => {
    let newText = text
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
    setText(newText);
  };
  const clearText = () => {
    let newText = "";
    setText(newText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const [text, setText] = useState("");

  //download text file
  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([text], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = "file.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <>
      <div className="container mb-3">
        <h1 className="m-3">Type the here text to analyse</h1>
        <textarea
          value={text}
          onChange={handleOnChange}
          className="form-control m-1"
          rows="7"
          id="myBox"
          style={{
            backgroundColor: props.mode === "dark" ? "#222831" : "white",
            color: props.mode === "dark" ? "white" : "dark",
          }}
        />
        <button onClick={handleUpClick} className="btn btn-primary m-1">
          Convert to Uppercase
        </button>
        <button onClick={handleLoClick} className="btn btn-primary m-1">
          Convert to Lowercase
        </button>
        <button onClick={handleTiClick} className="btn btn-primary m-1">
          Convert to Title Case
        </button>
        <button onClick={clearText} className="btn btn-danger m-1">
          Clear Text
        </button>
        <button onClick={downloadTxtFile} className="btn btn-success m-1">
          Download Text File
        </button>
      </div>

      <div className="container">
        <h2>Your Text Summary</h2>
        <p>
          {text.split(" ").length} Words and {text.length} Characters.
        </p>
        <p>{0.008 * text.split(" ").length} Minutes read.</p>
        <h2>Preview</h2>
        <p>{text.length < 1 ? "Enter some text in the textbox to Preview" : text}</p>
      </div>
    </>
  );
}
