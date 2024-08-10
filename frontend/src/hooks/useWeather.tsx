import { useEffect, useState } from "react";
import axios from "axios";

export const useWeather = (coordinates: string) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const coords = coordinates.split(",");
  const lat = parseInt(coords[1]);
  const lon = parseInt(coords[0]);
  const [wgroup, setWgroup] = useState("");
  const [description, setDescription] = useState("");
  const [atmtemp, setAtmtemp] = useState(0);
  const [pressure, setPressure] = useState(0);
  const [humidity, setHumidity] = useState(0);

  //   const s =
  //     "https://api.agromonitoring.com/agro/1.0/weather?lat=35&lon=139&appid={YOUR_API_KEY}";
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.agromonitoring.com/agro/1.0/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setWgroup(response.data.weather[0].main);
        setDescription(response.data.weather[0].description);
        setAtmtemp(response.data.main.temp);
        setPressure(response.data.main.pressure);
        setHumidity(response.data.main.humidity);
        console.log(response.data.weather[0].main);
        console.log(response.data.weather[0].description);
        console.log(response.data.main.temp);
        console.log(response.data.main.pressure);
        console.log(response.data.main.humidity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return {
    wgroup,
    description,
    atmtemp,
    pressure,
    humidity,
  };
};
