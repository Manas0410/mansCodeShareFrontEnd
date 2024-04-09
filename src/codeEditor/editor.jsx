import Editor from "@monaco-editor/react";
const CodeEditor = ({ value, onChange, language = "plaintext", readOnly }) => {
  return (
    <>
      <Editor
        height="90vh"
        language={language}
        value={value}
        onChange={onChange}
        options={{
          readOnly: readOnly,
          lineHeight: 24,
          theme: "vs-dark",
        }}
      />
    </>
  );
};
export default CodeEditor;
