window.addEventListener("lod", getLocation());
const locationTimezone = document.querySelector(".location-timezone");
const tempeacher = document.querySelector(".degree");
const tempecherDiscripciton = document.querySelector(".tempecher-discripciton");
const img = document.querySelector(".img");
const degToF = document.querySelector(".dregree-section span");
console.log(degToF);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    //.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  let lon;
  let lat;
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38678e14f01a54fbb81d00ae4e43231a`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      locationTimezone.textContent = data.name;
      //tempeacher.textContent = Math.floor(data.main.temp_min - 273.15);
      degToF.addEventListener("click", () => {
        if (degToF.textContent === "F") {
          degToF.textContent = "C";
          tempeacher.textContent = Math.floor(data.main.temp_min - 273.15);
        } else {
          degToF.textContent = "F";
          tempeacher.textContent = Math.floor(
            ((data.main.temp_min - 273.15) * 9) / 5 + 32
          );
        }
      });
      tempecherDiscripciton.textContent = data.weather[0].description;
      img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    });
}
