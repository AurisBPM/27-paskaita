const parametersDiv = document.getElementById("parameters");
const cardsDiv = document.getElementById("cards");

const getForecastInfo = async () => {
    cardsDiv.innerHTML = "";
    const cityCode = document.querySelector(".places").value;
    const forecastCode = document.querySelector(".forecasts").value;

    try {
        const infoRequest = await fetch(`http://localhost:8080/places/${cityCode}/forecasts/${forecastCode}`);
        const data = await infoRequest.json();
        const timestamps = data.forecastTimestamps;
        timestamps.forEach((timestamp) => {
         const card = document.createElement("div");
         card.classList.add("card");
         const time = document.createElement("div");
         time.textContent = timestamp.forecastTimeUtc;
         const temperature = document.createElement("div");
         temperature.textContent = timestamp.airTemperature
         const condition = document.createElement("div");
         condition.textContent = timestamp.conditionCode
         card.append(time, temperature, condition);
         cardsDiv.append(card);
        });
    } catch (err) {
        console.log(err);
    }
}

const getForecasts = async (code) => {
    cardsDiv.innerHTML = "";
    const existingSelect = document.querySelector(".forecasts");
    if (existingSelect){
        existingSelect.remove();
    }
    
      try {
        const forecastsRequest = await fetch(`http://localhost:8080/places/${code}/forecasts`);
        console.log(forecastsRequest);
        const forecasts = await forecastsRequest.json();
        const forecastsSelect = document.createElement("select");
        forecastsSelect.classList.add("forecasts");
        parametersDiv.append(forecastsSelect);
        const placeholderOptionFor = document.createElement("option");
        placeholderOptionFor.textContent = "Select Forecast";
        placeholderOptionFor.disabled = true;
        placeholderOptionFor.selected = true;
        forecastsSelect.append(placeholderOptionFor);
        console.log(forecasts);
        forecasts.forEach((forecast) => {
            const forecastOption = document.createElement("option");
            forecastOption.textContent = forecast.description;
            forecastOption.value = forecast.type;
            forecastsSelect.append(forecastOption);
        });
        forecastsSelect.addEventListener('change', async (event) => {
            getForecastInfo();
        
          });
      } catch (err) {
        console.log(err);
      }

}

const getCities = async () => {
    cardsDiv.innerHTML = "";
  try {
    const request = await fetch("http://localhost:8080/places");
    const data = await request.json();
    console.log(data);
    const select = document.createElement("select");
    select.classList.add("places");
    const placeholderOptionCity = document.createElement("option");
    placeholderOptionCity.textContent = "Select Place";
    placeholderOptionCity.disabled = true;
    placeholderOptionCity.selected = true;

    data.forEach(city => {
      const cityOpt = document.createElement("option");
      cityOpt.textContent = city.name;
      cityOpt.value = city.code;
      select.append(cityOpt);
    });

    select.prepend(placeholderOptionCity);
    parametersDiv.append(select);
    select.addEventListener('change', async (event) => {
      const code = event.target.value;
      getForecasts(code);
    });
  } catch (err) {
    console.log(err);
  }
};

getCities();
