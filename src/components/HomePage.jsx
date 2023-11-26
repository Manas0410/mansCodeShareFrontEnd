import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateUniqueCode } from "../utils/UniqueCode";

const HomePage = () => {
  const payloadcode = {
    urlCode: "manas1",
    sharedData: "start sharing data (remove this line)",
    languageName: "javascript",
  };

  const navigate = useNavigate();
  const shareCode = async () => {
    try {
      const uniCode = generateUniqueCode(6);
      payloadcode.urlCode = uniCode;
      console.log(payloadcode.uniCode, "plu");
      const response = await axios.post(
        "https://manascodeshare.onrender.com/code/post",
        payloadcode
      );
      console.log("Code shared successfully:", response.data);
      navigate(`/code?c=${uniCode}`);
    } catch (error) {
      console.error("Error sharing code:", error.message);
    }
  };

  return (
    <div>
      <h1>Code Share by MANAS</h1>
      <div>
        <button onClick={shareCode}>Share Code</button>
      </div>
    </div>
  );
};

export default HomePage;
