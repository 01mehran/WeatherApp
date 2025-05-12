"use strict";

// Selecting Elements;
const elements = {
  form: document.querySelector("form"),
  input: document.querySelector("#input"),
  countryFlag: document.querySelector("#countryFlag"),
  countryName: document.querySelector("#countryName"),
  weatherStatus: document.querySelector("#weatherStatus"),
  temprature: document.querySelector("#temprature"),
  description: document.querySelector("#description"),
  wind: document.querySelector("#wind"),
  humidity: document.querySelector("#humidity"),
  pressure: document.querySelector("#pressure"),
  coulds: document.querySelector("#clouds"),
  main: document.querySelector("main"),
};
// Api Key
const apiKey = "bf31b594421ad31adee309a4a3e72c49";

// SearchCountry Function();
const searchCountry = async () => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${elements.input.value}&appid=${apiKey}&units=metric`
    );

    if (!res.ok) {
      throw new Error("City or country not found");
    }

    const data = await res.json();

    elements.countryName.textContent = data.name;
    elements.countryFlag.src = `https://flagsapi.com/${data.sys.country}/shiny/64.png`;
    elements.weatherStatus.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    elements.temprature.textContent = `${Math.trunc(data.main.temp)}°C`;
    elements.description.textContent = data.weather[0].description;
    elements.wind.textContent = data.wind.speed;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.pressure.textContent = `${data.main.pressure}hPa`;
    elements.coulds.textContent = `${data.clouds.all}%`;
    elements.input.value = "";
  } catch (err) {
    elements.input.value = "";
    elements.main.classList.add("error");
    setTimeout(() => {
      elements.main.classList.remove("error");
    }, 1000);
  }
};

// Submiting;
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (elements.input.value.trim() !== "") {
    searchCountry();
  }
});
