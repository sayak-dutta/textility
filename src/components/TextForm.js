import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.sendAlert("Text has been converted to Uppercase", "success");
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.sendAlert("Text has been converted lowercase", "success");
  };
  const handleTiClick = () => {
    let newText = text
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
      .join(" ");
    setText(newText);
    props.sendAlert("First letter of each word has been converted Uppercase", "success");
  };
  const clearText = () => {
    let newText = "";
    setText(newText);
    props.sendAlert("All text has been cleared", "danger");
  };
  const copyText = () => {
    let inputText = document.getElementById("myBox");
    inputText.select();
    navigator.clipboard.writeText(inputText.value);
    document.getSelection().removeAllRanges();
    props.sendAlert("Text has been copied to Clipboard", "info");
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
    props.sendAlert("Download Started", "success");
  };

  return (
    <>
      <div className="container mb-3">
        <h1 className="my-3">Type the here text to analyze</h1>
        <textarea
          value={text}
          onChange={handleOnChange}
          className="form-control m-1"
          rows="7"
          spellcheck="true"
          id="myBox"
          style={{
            backgroundColor: props.mode === "dark" ? "#222831" : "white",
            color: props.mode === "dark" ? "white" : "black",
          }}
        />
        <button
          disabled={text.length === 0}
          onClick={handleUpClick}
          className="btn btn-primary m-1"
        >
          Convert to Uppercase
        </button>
        <button
          disabled={text.length === 0}
          onClick={handleLoClick}
          className="btn btn-primary m-1"
        >
          Convert to Lowercase
        </button>
        <button
          disabled={text.length === 0}
          onClick={handleTiClick}
          className="btn btn-primary m-1"
        >
          Convert to Title Case
        </button>
        <button disabled={text.length === 0} onClick={copyText} className="btn btn-info m-1">
          Copy Text
        </button>
        <button disabled={text.length === 0} onClick={clearText} className="btn btn-danger m-1">
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          onClick={downloadTxtFile}
          className="btn btn-success m-1"
        >
          Download Text File
        </button>
      </div>

      <div className="container">
        <h2>Your Text Summary</h2>
        <p>
          {
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          Words and {text.length} Characters.
        </p>
        <p>
          {0.008 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minutes read.
        </p>
        <h2>Preview</h2>
        <p>{text.length < 1 ? "Enter some text in the textbox to Preview" : text}</p>
      </div>
    </>
  );
}
