import axios from "axios";
import { useAuthContext, useStateContext } from "./";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const useAuth = () => {
  const {
    isUserLogedIn,
    myToken,
    currentUser,
    setIsUserLogedIn,
    setMyToken,
    setCurrentUser,
  } = useAuthContext();

  const { stateDispatch } = useStateContext();

  const navigate = useNavigate();

  const loginUser = async ({ email, password }) => {
    try {
      let res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        setIsUserLogedIn(true);
        setMyToken(res.data.encodedToken);
        setCurrentUser(res.data.foundUser);
        navigate("/explore");
        toast.success("Loged In Succesfully!");
      }
    } catch (err) {
      console.error("loginHandler : Error in login", err);
      toast.error("Something Went Wrong! Try Again Later");
    }
  };

  const signupUser = async ({
    firstName,
    lastName = "dev",
    email,
    password,
  }) => {
    try {
      let res = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res.status === 201) {
        setIsUserLogedIn(true);
        setMyToken(res.data.encodedToken);
        setCurrentUser(res.data.createdUser);
        navigate("/explore");
        toast.success("Successfully Created Account");
      }
    } catch (err) {
      console.error("singupHandler : Error in signing up", err);
      toast.error("Something Went Wrong! Try Again Later");
    }
  };

  const logoutUser = () => {
    setIsUserLogedIn(false);
    setCurrentUser({});
    setMyToken("");
    stateDispatch({ type: "CLEAR_USER_DATA" });
    navigate("/explore");
    toast("Logout Successfully!");
  };

  return { loginUser, signupUser, logoutUser };
};

export { useAuth };
