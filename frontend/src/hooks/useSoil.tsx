import { useEffect, useState } from "react";
import axios from "axios";

export const useSoil = (polyID: string) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const [t10, setT10] = useState(0);
  const [moisture, setMoisture] = useState(0);
  const [t0, setT0] = useState(0);
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    axios
      .get(
        `http://api.agromonitoring.com/agro/1.0/soil?polyid=${polyID}&appid=${apiKey}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setT10(response.data.t10);
        setMoisture(response.data.moisture);
        setT0(response.data.t0);
        console.log(response.data.t10);
        console.log(response.data.moisture);
        console.log(response.data.t0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    t10,
    moisture,
    t0,
  };
};
