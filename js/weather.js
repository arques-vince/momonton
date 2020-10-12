const KEY_API = "61a01aaac4701a654677024dbf60e048";
const API_WEATHER = "https://api.openweathermap.org/data/2.5/weather?";
const KEY_COORDS = "coords";

const weatherText = document.querySelector(".weather__text");

const getWeather = ({ latitude, longitude }) => {
  fetch(
    `${API_WEATHER}lat=${latitude}&lon=${longitude}&appid=${KEY_API}&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        console.error(`Error ${response.status}\n`);
        response.text().then(console.error);
        return null;
      }
      return response.json();
    })
    .then((json) => {
      if (!json) {
        return;
      }
      console.dir(json);
      const {
        main: { temp },
        name
      } = json;
      weatherText.innerText = `${temp}°C @ ${name}`;
    });
};

const saveCoords = (coords) => {
  console.log(coords);
  localStorage.setItem(KEY_COORDS, JSON.stringify(coords));
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem(KEY_COORDS);
  if (!loadedCoords) {
    askForCoords();
  } else {
    const { latitude, longitude } = JSON.parse(loadedCoords);
    getWeather({ latitude, longitude });
  }
};

const handleGeoSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  saveCoords({ latitude, longitude });
  getWeather({ latitude, longitude });
};

const handleGeoError = () => {
  console.log("Failed to access geo location");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

const init = () => {
  loadCoords();
};
init();
