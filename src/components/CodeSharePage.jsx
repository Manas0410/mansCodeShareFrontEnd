/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/editor";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const CodeSharePage = () => {
  const [updateBtnEn, setUpdateBtnEn] = useState(false);
  const [codeData, setCodeData] = useState({
    languageName: "",
    sharedData: "",
    urlCode: "",
  });
  // function to handle editor value
  const handleCodeChange = (newValue) => {
    setCodeData((prev) => {
      let temp = { ...prev };
      temp.sharedData = newValue;
      return temp;
    });
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
  }, [cValue]);

  console.log(codeData);
  //share code api call
  const shareCode = async () => {
    try {
      setUpdateBtnEn(true);
      await axios.put(
        "https://manascodeshare.onrender.com/code/update",
        codeData
      );
      alert("Successfully updated code. Now you can share it!");
      setUpdateBtnEn(false);
    } catch (error) {
      console.error("Error updating code:", error.message);
    }
  };
  return (
    <div>
      <div className="header">
        <h3>by MANAS</h3>
        <button onClick={shareCode} disabled={updateBtnEn} className="bn5">
          Share Code
        </button>
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
