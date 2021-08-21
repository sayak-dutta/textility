import React from "react";

export default function About() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <img
        className="d-block mx-auto mb-4"
        src={process.env.PUBLIC_URL + "/favicon-96x96.png"}
        alt=""
        width="72"
        height="72"
      />
      <h1 className="display-5 fw-bold">About Textility</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Apart from counting words and characters, textility can help you to improve word choice
          and writing style, and, optionally, help you to detect grammar mistakes and plagiarism. To
          check word count, simply place your cursor into the text box above and start typing.
          You'll see the number of characters and words increase or decrease as you type, delete,
          and edit them.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <a href="https://twitter.com/gameboysayak" target="_">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">
              <i class="fab fa-twitter m-1"></i>
              Sayak Dutta
            </button>
          </a>

          <a href="https://github.com/sayak-dutta" target="_">
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">
              <i class="fab fa-github m-1"></i>
              My GitHub
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
