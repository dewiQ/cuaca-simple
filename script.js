let cuaca = {
    keyApi: "9314c3ace6a74e69149d99cf3ab2a27b",
    fetchCuaca: async function(kota) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + kota 
            + "&lang=id&units=metric&appid=" 
            + this.keyApi
        )
        .then((response) => response.json())
        .then((data) => this.displayCuaca(data));
    },
    displayCuaca: async function(data){
    	const {name} = data;
    	const{description, icon} = data.weather[0];
    	const{temp, feels_like, pressure, humidity} = data.main;
    	const{speed} = data.wind;
    	console.log(name, description, icon, temp, humidity, speed);
    	document.querySelector(".kota").innerHTML = "Cuaca di " + name;
    	document.querySelector(".tekanan").innerHTML = "Tekanan " + pressure + " mb";
    	document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
    	document.querySelector(".deskripsi").innerHTML = description;
    	document.querySelector(".temp").innerHTML = Math.round(temp) + "°c";
    	document.querySelector(".real").innerHTML = "RealFeel " + Math.round(feels_like) + "°";
    	document.querySelector(".humidity").innerHTML = "Kelembapan " + humidity + "%";
    	document.querySelector(".wind").innerHTML = "Angin " + Math.round(speed) + " m/s";
    	document.querySelector(".cuaca").classList.remove("loading");
    },
    search: function(){
    	this.fetchCuaca(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
	cuaca.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
	if(event.key === "Enter"){
		cuaca.search();
	}
});

cuaca.fetchCuaca("Semarang");



