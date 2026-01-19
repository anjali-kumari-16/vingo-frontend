import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLocation, setAddress } from "../redux/mapSlice";

function useGetCity() {
  const dispatch = useDispatch();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEOAPIFY;

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    const getPosition = () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            dispatch(setLocation({ lat: latitude, lon: longitude }));

            const result = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
            );

            if (result.data?.results?.length > 0) {
              const addressInfo = result.data.results[0];
              const formattedAddress = addressInfo.formatted;
              dispatch(setAddress(formattedAddress));
            }
          } catch (error) {
            console.error("Error fetching city data:", error);
          }
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          dispatch(setAddress("Location Timeout (Using Default)"));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }

      );
    };

    getPosition();
  }, [dispatch]);
}

export default useGetCity;

