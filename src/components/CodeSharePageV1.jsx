// @ts-check
import { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/editor";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import React from "react";

const baseUrl = "https://manascodeshare.onrender.com/";
const socket = io(baseUrl);

const CodeSharePageV1 = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const cValue = params.get("c");

  const [codeData, setCodeData] = useState({
    languageName: "python",
    sharedData: "",
    urlCode: "",
    isEditable: true,
    userId: "xxx",
  });

  // fetching data at initial state
  useEffect(() => {
    axios
      .get(`${baseUrl}code/get?urlCode=${cValue}`)
      .then((data) => setCodeData(data.data));
  }, []);

  //onchange fxn of editor
  const handleCodeChange = async (newValue) => {
    const updatedDataToSend = { ...codeData, sharedData: newValue };
    setCodeData(updatedDataToSend);

    await axios
      .put(`${baseUrl}code/update`, updatedDataToSend)
      .then(() =>
        socket.emit("send_message", { message: "Hello from client" })
      );
  };

  //   getting data from socket on change
  useEffect(() => {
    socket.on("receive_message", () => {
      axios
        .get(`${baseUrl}code/get?urlCode=${cValue}`)
        .then((response) => setCodeData(response.data.data));
    });
  }, [socket]);

  return (
    <div>
      <CodeEditor
        readOnly={false}
        language={codeData.languageName}
        value={codeData.sharedData}
        onChange={handleCodeChange}
        // editorDidMount={editorDidMount}
      />
    </div>
  );
};

export default CodeSharePageV1;
