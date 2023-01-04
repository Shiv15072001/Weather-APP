const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "82406a2c33msh3bd847978bfad0cp11d881jsn0439a166da05",
		"X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
	},
};

// sunrise and sunset time

const realtime = (time) => {
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const unixTimestamp = time;
	const localTime = new Date(unixTimestamp * 1000);
	// console.log(localTime)

	var rltime = new Date(localTime).toLocaleString(undefined, {
		timeZone: "Asia/Kolkata",
	});
	return rltime;
};

// condition changing color

const changeClass = (elementId, value, borderColor, textColor) => {
	if (value != undefined) {
		document.getElementById(
			elementId + "1"
		).className = `card mb-4 rounded-3 shadow-sm border-${borderColor}`;
		document.getElementById(
			elementId + "2"
		).className = `card-header py-3 text-bg-${textColor} border-${borderColor}`;
	}
};

const change = (temper) => {
	if (temper != undefined) {
		if (temper < 15 && temper > -100) {
			changeClass("t", temper, "info", "info");
		} else if (temper >= 15 && temper < 28) {
			changeClass("t", temper, "warning", "warning");
		} else if (temper >= 28) {
			changeClass("t", temper, "danger", "danger");
		}
	}
};

const change1 = (windee) => {
	if (windee != undefined) {
		if (windee < 6) {
			changeClass("w", windee, "success", "success");
		} else if (windee >= 6 && windee <= 32) {
			changeClass("w", windee, "warning", "warning");
		} else if (windee > 32) {
			changeClass("w", windee, "danger", "danger");
		}
	}
};

const change2 = (Humidi) => {
	if (Humidi != undefined) {
		if (Humidi >= 0 && Humidi < 40) {
			changeClass("H", Humidi, "primary", "primary");
		} else if (Humidi >= 40 && Humidi < 70) {
			changeClass("H", Humidi, "success", "success");
		} else if (Humidi >= 70 && Humidi <= 100) {
			changeClass("H", Humidi, "danger", "danger");
		}
	}
};


const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

// weather calling API function here...

const weatherInfo = (city) => {
	cities.innerHTML = `<b>${city}</b>`;
	fetch(
		`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`,
		options
	)
		.then((response) => response.json())
		.then((response) => {
			// Cloud_pct.innerHTML = response.Cloud_pct
			if (!response.error) {
				Feels_like.innerHTML = `<b>${response.feels_like}°C</b>`;
				Humidity.innerHTML = `<b>${response.humidity}%</b>`;
				Humidity1.innerHTML = `${response.humidity}%`;
				Max_temp.innerHTML = `<b>${response.max_temp}°C</b>`;
				Min_temp.innerHTML = `<b>${response.min_temp}°C</b>`;
				Sunrise.innerHTML = `<b>${realtime(response.sunrise)}</b>`;
				Sunset.innerHTML = `<b>${realtime(response.sunset)}</b>`;
				Temp.innerHTML = `<b>${response.temp}°C</b>`;
				Temp1.innerHTML = `${response.temp}°C`;
				Wind_degrees.innerHTML = `<b>${response.wind_degrees}°</b>`;
				Wind_speed.innerHTML = `<b>${Math.floor(
					response.wind_speed * 3.6
				)} KM/hr</b>`;
				Wind_speed1.innerHTML = `${Math.floor(
					response.wind_speed * 3.6
				)} KM/hr`;

				// for changing color
				change(response.temp);
				change1(Math.floor(response.wind_speed * 3.6));
				change2(response.humidity);

			} else if (response.error) {
				console.log("This city Weather API is not Found");
				cities.innerHTML = `<b>'${city}'</b><h class="text-secondary bg-light"> Not Found!</h>`;
				document.getElementById("t1").className =
					"card mb-4 rounded-3 shadow-sm border-secondary";
				document.getElementById("t2").className =
					"card-header py-3 text-bg-secondary border-secondary";
				document.getElementById("H1").className =
					"card mb-4 rounded-3 shadow-sm border-secondary";
				document.getElementById("H2").className =
					"card-header py-3 text-bg-secondary border-secondary";
				document.getElementById("w1").className =
					"card mb-4 rounded-3 shadow-sm border-secondary";
				document.getElementById("w2").className =
					"card-header py-3 text-bg-secondary border-secondary";
				console.log("The value of temp is ", response.temp)


				Feels_like.innerHTML = `<b>- °C</b>`;
				Humidity.innerHTML = `<b>- %</b>`;
				Humidity1.innerHTML = `- %`;
				Max_temp.innerHTML = `<b>-  °C</b>`;
				Min_temp.innerHTML = `<b>-°C</b>`;
				Sunrise.innerHTML = `<b>----- </b>`;
				Sunset.innerHTML = `<b>----- </b>`;
				Temp.innerHTML = `<b>- °C</b>`;
				Temp1.innerHTML = `- °C`;
				Wind_degrees.innerHTML = `<b>- °</b>`;
				Wind_speed.innerHTML = `<b>- KM/hr</b>`;
				Wind_speed1.innerHTML = `- KM/hr`;
				// document.getElementById("alert").style.display
			}

			console.log(response);
			console.log(response.temp);
		})
		.catch((err) => console.error(err));
};

weatherInfo("Delhi");

submit.addEventListener("click", (e) => {
	e.preventDefault();
	weatherInfo(input.value);
});

Del.addEventListener("click", (e) => {
	e.preventDefault();
	weatherInfo(Del.innerHTML); // Delhi
});

Jam.addEventListener("click", (e) => {
	e.preventDefault();
	weatherInfo(Jam.innerHTML); // Jamshedpur
});

Mum.addEventListener("click", (e) => {
	e.preventDefault();
	weatherInfo(Mum.innerHTML); // Mumbai
});

// Enter weather for various city.

let option = [
	"delhi",
	"jamshedpur",
	"kolkata",
	"Chennai",
	"Bangalore",
	"Gujrat",
	"Ahmedabad"
];

const weaterInfo = () => {

	const elementIds = [
		"Temp",
		"Humidity",
		"Feels_like",
		"Wind_degrees",
		"Wind_speed",
		"Cloud_pct",
	];

	for (let i = 0; i < option.length; ++i) {
		fetch(
			`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${option[i]}`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				elementIds.forEach((elementId) => {
					const ele = document.getElementById(`${elementId}1${i + 1}`);
					const value = response[elementId.toLowerCase()];
					if (elementId === "Wind_speed") {
						ele.innerHTML = `${Math.floor(value * 3.6)} KM/hr`;
					} else if (elementId === "Wind_degrees") {
						ele.innerHTML = `${value}°`;
					} else if (elementId === "Temp" || elementId === "Feels_like") {
						ele.innerHTML = `${value}°C`;
					} else {
						ele.innerHTML = `${value}%`;
					}
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
};

weaterInfo(option);
