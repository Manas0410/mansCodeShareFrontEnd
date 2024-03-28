// /* eslint-disable no-unused-vars */
import { useEffect, useMemo, useState, useRef } from "react";
import CodeEditor from "../codeEditor/editor";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import LangSelectorDropDown from "./LanguageSelector/LanguageSelector";
import IsEditable from "./isEditable/ISEditable";
import { useUserAuth } from "./AuthContext/UserAuthContext";
import LogOut from "../LogOut/LogOut";
import io from "socket.io-client";

const socket = io("https://manascodeshare.onrender.com/");
const CodeSharePage = () => {
  const timerRef = useRef();
  const { user } = useUserAuth();
  const [updateBtnEn, setUpdateBtnEn] = useState(false);
  const [codeData, setCodeData] = useState({
    languageName: "python",
    sharedData: "",
    urlCode: "",
    isEditable: true,
    userId: "xxx",
  });
  const [emitEnable, setEmitEnable] = useState(true);
  // function to handle editor value
  useEffect(() => {
    if (emitEnable) {
      if (codeData.sharedData) {
        shareCode();
        socket.emit("send_message", { message: "Hello from client" });
      }
    }
  }, [codeData.sharedData, emitEnable]);

  const handleCodeChange = (newValue, event) => {
    setCodeData((prev) => ({ ...prev, sharedData: newValue }));
  };

  const editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };
  //calling api to get data
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  // Get the value of the 'c' parameter
  const cValue = params.get("c");
  useEffect(() => {
    axios
      .get(`https://manascodeshare.onrender.com/code/get?urlCode=${cValue}`)
      .then((data) => setCodeData(data.data));
  }, []);

  // socket data
  useEffect(() => {
    socket.on("receive_message", () => {
      setEmitEnable(false);
      axios
        .get(`https://manascodeshare.onrender.com/code/get?urlCode=${cValue}`)
        .then((data) => setCodeData(data.data))
        .then(setEmitEnable(true));
    });
  }, [socket]);

  console.log(codeData);

  //to get latest editable state val
  const getEditableState = async (cValue) => {
    try {
      const response = await axios.get(
        `https://manascodeshare.onrender.com/code/get?urlCode=${cValue}`
      );
      return response.data.isEditable;
    } catch (error) {
      console.error("Error fetching editable state:", error);
      return false; // Default to false if an error occurs
    }
  };

  //share code api call
  const shareCode = async () => {
    let isEditable1 = await getEditableState(cValue);
    console.log("codeData", codeData);
    if (user?.uid !== codeData.userId && !isEditable1) {
      alert("u dont hv permission to edit this code");
      return;
    } else {
      try {
        setUpdateBtnEn(true);
        await axios.put(
          "https://manascodeshare.onrender.com/code/update",
          codeData
        );
        // alert("Successfully updated code. Now you can share it!");
        setUpdateBtnEn(false);
      } catch (error) {
        console.error("Error updating code:", error.message);
      }
    }
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
          <LangSelectorDropDown codeData={codeData} setCodeData={setCodeData} />
          <button
            onClick={shareCode}
            disabled={updateBtnEn}
            className="bn5"
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "manrope",
              width: 50,
              height: 0,
              fontSize: 15,
              background: "black",
            }}
          >
            Share
          </button>
          <LogOut />
        </div>
        {user?.uid === codeData.userId && (
          <div className="editablePlaced">
            <IsEditable
              isEditable={codeData.isEditable}
              setCodeData={setCodeData}
            />
          </div>
        )}
      </div>
      <div>
        <CodeEditor
          language={codeData.languageName}
          value={codeData.sharedData}
          onChange={handleCodeChange}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
};

export default CodeSharePage;
