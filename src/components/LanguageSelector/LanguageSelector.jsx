import { useEffect, useRef, useState } from "react";
import { Languages } from "../../utils/languages";

const LangSelectorDropDown = ({ codeData, setCodeData }) => {
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const inpRef = useRef(null);

  useEffect(() => {
    const filtered = Languages.filter((lang) =>
      lang.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLanguages(filtered);
  }, [search]);

  const searchHandler = (event) => {
    let timer;
    if (timer) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        setSearch(event.target.value);
      }, 1500);
    }
  };

  const handleLanguageChange = (event) => {
    setCodeData((prev) => {
      let temp = { ...prev };
      temp.languageName = event.target.value;
      return temp;
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <select value={codeData.languageName} onChange={handleLanguageChange}>
        <option value="plaintext">Select Language</option>
        <option value=""></option>
        {filteredLanguages.map((item, i) => {
          return (
            <option key={i} value={item.value}>
              {item.name}
            </option>
          );
        })}
      </select>
      <input
        ref={inpRef}
        type="text"
        onChange={searchHandler}
        style={{
          position: "absolute",
          top: "-17px",
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default LangSelectorDropDown;
