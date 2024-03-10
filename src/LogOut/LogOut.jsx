import { useUserAuth } from "../components/AuthContext/UserAuthContext";

const LogOut = () => {
  const { logOut } = useUserAuth();

  return (
    <button
      className="logout-button"
      onClick={() => {
        logOut();
      }}
    >
      Log out
    </button>
  );
};
export default LogOut;
