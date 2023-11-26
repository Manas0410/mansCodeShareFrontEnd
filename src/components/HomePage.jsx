import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateUniqueCode } from "../utils/UniqueCode";
import { useState } from "react";

const HomePage = () => {
  const payloadcode = {
    urlCode: "manas1",
    sharedData: "start sharing data (remove this line)",
    languageName: "javascript",
  };
  const [shareButtonEnable, setShareButtonEnable] = useState(false);
  const navigate = useNavigate();
  const shareCode = async () => {
    try {
      setShareButtonEnable(true);
      const uniCode = generateUniqueCode(6);
      payloadcode.urlCode = uniCode;
      console.log(payloadcode.uniCode, "plu");
      const response = await axios.post(
        "https://manascodeshare.onrender.com/code/post",
        payloadcode
      );
      console.log("Code shared successfully:", response.data);
      setShareButtonEnable(false);

      navigate(`/code?c=${uniCode}`);
    } catch (error) {
      console.error("Error sharing code:", error.message);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
      <div className="homeContainer"></div>
      <div className="homepage">
        <h1>Code Share by MANAS</h1>
        <div>
          <button
            onClick={shareCode}
            disabled={shareButtonEnable}
            className="bn5"
          >
            Share Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
