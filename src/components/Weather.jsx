import { useState } from "react";

export default function WeatherApp() {
  const [weather, setWeather] = useState({
    icon: "--",
    temp: "-.-",
    city: "Veuillez entrer une ville",
  });

  function handleSubmit(event) {
    event.preventDefault();
    const city = event.target.city.value.trim();
    if (!city) return;

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          temp: data.main.temp,
          city: data.name,
        });
      });

    event.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Ville" name="city" />
        <button type="submit">Recherche</button>
      </form>

      <img src={weather.icon} alt="" />
      <div>{weather.temp}°C</div>
      <div>{weather.city}</div>
    </div>
  );
}
