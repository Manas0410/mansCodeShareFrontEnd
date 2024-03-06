// import { useState } from "react";
// import LangSelectorDropDown from "../components/LanguageSelector/LanguageSelector";
// import axios from "axios";

// const Header =()=>{
//   const [updateBtnEn, setUpdateBtnEn] = useState(false);

//     const shareCode = async () => {
//       try {
//         setUpdateBtnEn(true);
//         await axios.put(
//           "https://manascodeshare.onrender.com/code/update",
//           codeData
//         );
//         alert("Successfully updated code. Now you can share it!");
//         setUpdateBtnEn(false);
//       } catch (error) {
//         console.error("Error updating code:", error.message);
//       }
//     };
//     return (
//       <>
//         <div className="header">
//           <aside>Code Share</aside>
//           <LangSelectorDropDown codeData={codeData} setCodeData={setCodeData} />
//           <button onClick={shareCode} disabled={updateBtnEn} className="bn5">
//             Share Code
//           </button>
//         </div>
//       </>
//     );
// }
