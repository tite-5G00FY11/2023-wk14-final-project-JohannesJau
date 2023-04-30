// Select DOM elements for the main table body and wind speed table body
const mainTableBody = document.querySelector(".main-table-body");
const windSpeedTableBody = document.getElementById("wind-speed-table-body");

// Wait for the window to load, then execute the following functions
window.addEventListener("load", () => {
  // Select the wind speed table body element again (in case it wasn't loaded before)
  const windSpeedTableBody = document.getElementById("wind-speed-table-body");

  // Call the functions to load weather data into the main table and  charts
  loadMainWeather();
  myGraph();
  loadWindSpeed();
  loadHumidityOut();
});

// Load weather data into the main table
function loadMainWeather() {
  // Select the main table body element again (in case it wasn't loaded before)
  const mainTableBody = document.querySelector(".main-table-body");

  // Clear the main table body
  mainTableBody.innerHTML = "";

  // Fetch weather data from the API and display it in the main table
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
    .then((response) => response.json())
    .then((data) => {
      // Limit the data to the latest 50 entries
      let latestData = data.slice(0, 50);
      latestData = latestData;

      // Map over the data and create HTML rows for the main table
      latestData.map((item, index) => {
        // Extract the date, time, type, and value of the weather data
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        let type = Object.keys(item.data).join();
        const value = Object.values(item.data)[0].toFixed(2);

        // Add a leading zero to the index if it's less than 10
        index += 1;
        if (index < 10) index = `0${index}`;

        // Format the type of weather data for better readability
        if (type === "Air_pres_1") {
          type = "Air pressure";
        }
        if (type === "BMP_temp_1") {
          type = "temperature";
        }
        if (type === "DHT11_hum_1") {
          type = "humidity";
        }
        if (type === "DHT11_temp_1") {
          type = "temperature";
        }
        if (type === "DS1820_temp_1") {
          type = "temperature";
        }
        if (type.includes("_")) {
          type = type.replace("_", " ");
        }

        // Create an HTML row for the current weather data
        const tr = `
              <td class="bold">${index}</td>
              <td class="capitalize">${type}</td>
              <td>${date}</td>
              <td>${time}</td>
              <td>${value}</td>
              `;
        // Add the row to the main table body
        mainTableBody.innerHTML += tr;
      });
    });
}

// Load wind speed data into the wind speed table and chart
function loadWindSpeed() {
  // Select the wind speed table body element again (in case it wasn't loaded before)
  const windSpeedTableBody = document.getElementById("wind-speed-table-body");

  // If the wind speed table body is not found, log an error and return
  if (!windSpeedTableBody) {
    console.error("Failed to find 'wind-speed-table-body' element");
    return;
  }
      // Clear the table body
      windSpeedTableBody.innerHTML = "";

      // Initialize empty arrays for labels and dataset
      const labels = [];
      const dataset = [];

      // Fetch the wind speed data
      fetch(
        "https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed"
      )
        .then((response) => response.json())
        .then((data) => {

           // Loop through the data and format each row
          data.map((item, index) => {

              // Extract the date, time, and wind speed from the data
            const date = item.date_time.slice(0, 10);
            const time = item.date_time.slice(11, 19);
            const wind_speed = Object.values(item.wind_speed).join("");

            // Pad the index with a leading zero if necessary
            index += 1;
            if (index < 10) index = `0${index}`;

            // Construct a table row with the formatted data
            const tr = `
            <td class="bold">${index}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>${wind_speed}</td>
            `;

             // Append the table row to the table body
            windSpeedTableBody.innerHTML += tr;

            // Add the time and wind speed to the labels and dataset arrays
            labels.push(time);
            dataset.push(wind_speed);
          });
        });

        // Initialize a new Chart object with the wind speed data
      const windSpeedChart = document.getElementById("wind-speed-chart");
      windSpeedCanva = new Chart(windSpeedChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Wind Speed",
              data: dataset,
              backgroundColor: ["rgba(226, 146, 177, 0.5)"],
              borderColor: ["rgba(226, 146, 177, 0.8)"],
              borderWidth: 2,
            },
          ],
        },
      });
    };

    // Define a function to load humidity out data
    function loadHumidityOut() {
      // Get the table body element for humidity out data
      const humidityoutTableBody = document.getElementById("humidity-out-table-body");
      // If the element is not found, log an error and return
      if (!humidityoutTableBody) {
        console.error("Failed to find 'humidity-out-table-body' element");
        return;
      }
      // Clear the table body
      humidityoutTableBody.innerHTML = "";
      const labels = [];
      const dataset = [];
      fetch(
        "https://webapi19sa-1.course.tamk.cloud/v1/weather/humidity_out"
      )
        .then((response) => response.json())
        .then((data) => {
          data.map((item, index) => {
            const date = item.date_time.slice(0, 10);
            const time = item.date_time.slice(11, 19);
            const humidity_out = Object.values(item.humidity_out).join("");
            index += 1;
            if (index < 10) index = `0${index}`;
            const tr = `
            <td class="bold">${index}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>${humidity_out}</td>
            `;
            humidityoutTableBody.innerHTML += tr;
            labels.push(time);
            dataset.push(humidity_out);
          });
        });
      const humidityoutChart = document.getElementById("humidity-out-chart");
      humidityoutCanva = new Chart(humidityoutChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Humidity Out",
              data: dataset,
              backgroundColor: ["rgba(226, 146, 177, 0.5)"],
              borderColor: ["rgba(226, 146, 177, 0.8)"],
              borderWidth: 2,
            },
          ],
        },
      });
    };






    
  function myGraph(){
  
  fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/')
      .then(response => response.json())
      .then(data => {
        // Get latest 5 temperature readings
        const latestData = data.slice(-5);

        // Extract data for chart
        const labels = latestData.map(datum => new Date(datum.date_time).toLocaleString());
        const dataPoints = latestData.map(datum => parseFloat(datum.temperature));

        // Create diagram
        const chart = new Chart(document.getElementById('temperature-chart'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Temperature (C°)',
              data: dataPoints,
              borderColor: 'blue',
              fill: false
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            tooltips: {
              callbacks: {
                label: function(tooltipItem, data) {
                  const date = new Date(tooltipItem.xLabel);
                  const formattedDate = date.toLocaleDateString();
                  const formattedTime = date.toLocaleTimeString();
                  const temperature = tooltipItem.yLabel + ' °C';
                  return formattedDate + ' ' + formattedTime + ': ' + temperature;
                }
              }
            }
          }
        });
      })
    }