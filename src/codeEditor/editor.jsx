/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import MonacoEditor from "react-monaco-editor";

const CodeEditor = ({ value, onChange, language }) => {
  const editorDidMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  return (
    <MonacoEditor
      width="99vw"
      height="90vh"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;
