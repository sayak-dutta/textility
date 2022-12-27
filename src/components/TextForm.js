import React, { useState } from "react";
import { OpenAIApi, Configuration } from "openai";

export default function TextForm(props) {
	const configuration = new Configuration({
		apiKey: "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",
	});
	const openai = new OpenAIApi(configuration);
	const [userText, setText] = useState("");
	const [outputText, setOutputText] = useState("");

	const handleUpClick = () => {
		let newText = userText.toUpperCase();
		setOutputText(newText);
		props.sendAlert("Text has been converted to Uppercase", "success");
	};
	const handleLoClick = () => {
		let newText = userText.toLowerCase();
		setOutputText(newText);
		props.sendAlert("Text has been converted lowercase", "success");
	};
	const handleTiClick = () => {
		let newText = userText
			.split(" ")
			.map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
			.join(" ");
		setOutputText(newText);
		props.sendAlert("First letter of each word has been converted Uppercase", "success");
	};
	const clearText = () => {
		let newText = "";
		setText(newText);
		setOutputText(newText);
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
	const rephraseText = async () => {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: "rephrase:" + userText,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});
		let newText = response.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
		setOutputText(newText);
	};
	const checkGrammer = async () => {
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: "Correct this to standard English :" + userText,
			temperature: 0.7,
			max_tokens: 256,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
		});
		let newText = response.data.choices[0].text.replace(/(\r\n|\n|\r)/gm, "");
		setOutputText(newText);
	};

	//download text file
	const downloadTxtFile = () => {
		const element = document.createElement("a");
		const file = new Blob([userText], {
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
				<div className="row">
					<div className="col-md-6">
						<h2 className="my-3 text-center">Type the here text to analyze</h2>
						<textarea
							value={userText}
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
							disabled={userText.length === 0}
							onClick={handleUpClick}
							className="btn btn-primary m-1"
						>
							CONVERT TO UPPERCASE
						</button>
						<button
							disabled={userText.length === 0}
							onClick={handleLoClick}
							className="btn btn-primary m-1"
						>
							convert to lowercase
						</button>
						<button
							disabled={userText.length === 0}
							onClick={handleTiClick}
							className="btn btn-primary m-1"
						>
							Convert To Title Case
						</button>

						<button
							disabled={userText.length === 0}
							onClick={rephraseText}
							className={
								props.mode === "dark" ? "btn btn-light m-1" : "btn btn-dark m-1"
							}
						>
							Rephrase
						</button>
						<button
							disabled={userText.length === 0}
							onClick={checkGrammer}
							className={
								props.mode === "dark" ? "btn btn-light m-1" : "btn btn-dark m-1"
							}
						>
							Fix Grammar
						</button>
					</div>
					<div className="col-md-6">
						<div className="container">
							<h2 className="my-3 text-center">Preview</h2>

							<textarea
								value={
									outputText.length < 1
										? "Enter some text in the textbox to Preview"
										: outputText
								}
								onChange={handleOnChange}
								className="form-control m-1"
								rows="7"
								spellcheck="true"
								readOnly
								id="myBox"
								style={{
									backgroundColor: props.mode === "dark" ? "#222831" : "white",
									color: props.mode === "dark" ? "white" : "black",
								}}
							/>
							<button
								disabled={userText.length === 0}
								onClick={copyText}
								className="btn btn-info m-1"
							>
								Copy Text
							</button>
							<button
								disabled={userText.length === 0}
								onClick={clearText}
								className="btn btn-danger m-1"
							>
								Clear Text
							</button>
							<button
								disabled={userText.length === 0}
								onClick={downloadTxtFile}
								className="btn btn-success m-1"
							>
								Download Text File
							</button>

							<h2>Your Text Summary</h2>
							<p>
								{
									userText.split(" ").filter((element) => {
										return element.length !== 0;
									}).length
								}{" "}
								Words and {userText.length} Characters.
							</p>
							<p>
								{0.008 *
									userText.split(" ").filter((element) => {
										return element.length !== 0;
									}).length}{" "}
								Minutes read.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
