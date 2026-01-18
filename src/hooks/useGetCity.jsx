import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../config";
axios.defaults.withCredentials = true;


function useGetCity() {
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) =>{
        console.log(position)

    })
    
    },[])


}

export default useGetCity;
