/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import CodeEditor from "../codeEditor/editor";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const CodeSharePage = () => {
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
      await axios.put(
        "https://manascodeshare.onrender.com/code/update",
        codeData
      );
      alert("Successfully updated code. Now you can share it!");
    } catch (error) {
      console.error("Error updating code:", error.message);
    }
  };
  return (
    <div>
      <div>
        <CodeEditor
          language={codeData.languageName}
          value={codeData.sharedData}
          onChange={handleCodeChange}
          editorDidMount={editorDidMount}
        />
      </div>
      <button onClick={shareCode}>Share Code</button>
    </div>
  );
};

export default CodeSharePage;
// languageName
// :
// "javascript"
// sharedData
// :
// "manas Data after edit"
// urlCode
// :
// "Manas1"
