import { useEffect, useRef, useState } from "react";
import { Languages } from "../../utils/languages";
import "./langselector.css";

const LangSelectorDropDown = ({ codeData, setCodeData }) => {
  const { languageName = "Select Language" } = codeData;
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
      }, 800);
    }
  };

  const handleLanguageChange = (val) => {
    setCodeData((prev) => {
      let temp = { ...prev };
      temp.languageName = val;
      return temp;
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="langdropdown-heading">{languageName}</div>
      <div className="LangDropdown">
        <input
          ref={inpRef}
          type="text"
          onChange={searchHandler}
          className="lang-inp"
        />
        <div className="langdropdown-list">
          {filteredLanguages.map((item, i) => {
            return (
              <div
                key={i}
                value={item.value}
                onClick={() => {
                  handleLanguageChange(item.value);
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LangSelectorDropDown;
