import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../config";
axios.defaults.withCredentials = true;


function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/me`,
          { withCredentials: true }
        );
        dispatch(setUserData(result.data.user));
      } catch (error) {
        dispatch(setUserData(null)); // ✅ clear user

        console.log("No user logged in");
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
