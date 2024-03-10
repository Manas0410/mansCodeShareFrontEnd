import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateUniqueCode } from "../utils/UniqueCode";
import { useState } from "react";
import "./Styles/Homepage.styles.css";
import { useUserAuth } from "./AuthContext/UserAuthContext";
import LogOut from "../LogOut/LogOut";

const HomePage = () => {
  const { user } = useUserAuth();
  console.log(user, "xxxxxxxxxxxxxxxxxxx");
  const payloadcode = {
    urlCode: "manas1",
    sharedData: "start sharing data (remove this line)",
    languageName: "javascript",
    isEditable: true,
    userId: user?.uid,
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
    <div
      style={{
        display: "grid",
        height: "100vh",
        width: "100vw",
        placeItems: "center",
        backgroundColor: "#0a0808",
        position: "fixed",
        zIndex: "-100",
      }}
    >
      {/* <div style={{ position: "relative", height: "100vh", width: "100vw" }}>
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
      </div> */}
      <div className="card">
        <div className="home-card-content">
          <h1
            style={{
              fontFamily: "manrope",
              letterSpacing: "6px",
              fontSize: "76px",
              textAlign: "center",
            }}
          >
            MSxShare
          </h1>
          <h1
            style={{
              fontFamily: "manrope",
              letterSpacing: "6px",
              fontSize: "15px",
              textAlign: "center",
              marginBottom: "26px",
            }}
          >
            You can start sharing your code by clicking on below button
          </h1>
          <button
            onClick={shareCode}
            disabled={shareButtonEnable}
            className="bn5"
            style={{
              display: "flex",
              alignItems: "center",
              fontFamily: "manrope",
              width: 50,
              height: 0,
            }}
          >
            Start
          </button>
        </div>
      </div>
      <a
        className="about-dev"
        target="_blank"
        href="https://manas-srivastava-portfolio.netlify.app/"
      >
        About Developer
      </a>
      <LogOut />
    </div>
  );
};

export default HomePage;
