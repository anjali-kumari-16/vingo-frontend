import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axiosBackend from "../api/axiosBackend";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // 🔴 STOP API call if user not logged in
      if (!token) {
        dispatch(setUserData(null));
        return;
      }

      try {
        const result = await axiosBackend.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setUserData(result.data.user));
      } catch (error) {
        dispatch(setUserData(null));
        console.log("Session expired or invalid token");
      }
    };

    fetchUser();
  }, [dispatch]);
}

export default useGetCurrentUser;
