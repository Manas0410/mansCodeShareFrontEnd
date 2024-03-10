import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../components/AuthContext/UserAuthContext";

const LogOut = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div
          className="logout-button"
          onClick={() => {
            logOut();
            navigate(`/login`);
          }}
        >
          Log out
        </div>
      ) : (
        <div
          className="logout-button"
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Log in
        </div>
      )}
    </>
  );
};
export default LogOut;
