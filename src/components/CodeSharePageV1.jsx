// @ts-check
import { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/editor";
import { useLocation } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import React from "react";
import LangSelectorDropDown from "./LanguageSelector/LanguageSelector";
import LogOut from "../LogOut/LogOut";
import { useUserAuth } from "./AuthContext/UserAuthContext";
import IsEditable from "./isEditable/ISEditable";

// const baseUrl = "https://manascodeshare.onrender.com/";
const baseUrl = "https://codeshare-weld.vercel.app/";
const socket = io(baseUrl);

const CodeSharePageV1 = () => {
  console.log(socket, "sockettttt");
  console.log("abc");
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
    setCodeData({ ...updatedDataToSend });
    await axios
      .put(`${baseUrl}code/update`, updatedDataToSend)
      .then(() =>
        socket.emit("send_message", { message: "Hello from client" })
      );
  };

  // getting data from socket on change
  useEffect(() => {
    socket.on("receive_message", () => {
      axios
        .get(`${baseUrl}code/get?urlCode=${cValue}`)
        .then((response) => setCodeData(response.data));
    });
  }, [socket]);

  //   additional data
  const { user } = useUserAuth();

  // function for editable togle state change
  const editToggle = (flag) => {
    setCodeData((prev) => {
      return {
        ...prev,
        ["isEditable"]: !flag,
      };
    });
    const updatedDataToSend = { ...codeData, isEditable: !flag };

    axios
      .put(`${baseUrl}code/update`, updatedDataToSend)
      .then(() =>
        socket.emit("send_message", { message: "Hello from client" })
      );
  };

  // function for lang change
  const langChange = (lang) => {
    setCodeData((prev) => {
      return {
        ...prev,
        ["languageName"]: lang,
      };
    });
    const updatedDataToSend = { ...codeData, languageName: lang };

    axios
      .put(`${baseUrl}code/update`, updatedDataToSend)
      .then(() =>
        socket.emit("send_message", { message: "Hello from client" })
      );
  };

  return (
    <div>
      <div className="header">
        <span
          style={{
            fontFamily: "manrope",
            letterSpacing: "6px",
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 900,
          }}
        >
          MSxShare
        </span>
        <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
          <LangSelectorDropDown codeData={codeData} langChange={langChange} />

          <LogOut />
        </div>
        {user?.uid === codeData.userId && (
          <div className="editablePlaced">
            <IsEditable
              isEditable={codeData.isEditable}
              editToggle={editToggle}
            />
          </div>
        )}
      </div>
      <CodeEditor
        readOnly={user?.uid !== codeData.userId && !codeData.isEditable}
        language={codeData.languageName}
        value={codeData.sharedData}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeSharePageV1;
// check
