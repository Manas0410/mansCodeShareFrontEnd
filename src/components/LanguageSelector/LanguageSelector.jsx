import { useEffect, useRef, useState } from "react";
import { Languages } from "../../utils/languages";
import "./langselector.css";

const LangSelectorDropDown = ({ codeData, langChange }) => {
  const { languageName = "Select Language" } = codeData;
  const [search, setSearch] = useState("");
  const [filteredLanguages, setFilteredLanguages] = useState([]);
  const inpRef = useRef(null);
  const [listTogler, setListTogler] = useState(false);

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

  return (
    <div style={{ position: "relative" }}>
      <div
        className="langdropdown-heading"
        onClick={() => setListTogler(!listTogler)}
      >
        <div>{languageName}</div>
        <div>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>
      {listTogler && (
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
                    langChange(item.value);
                    setListTogler(false);
                  }}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LangSelectorDropDown;
