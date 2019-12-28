window.addEventListener("load", () => {

	let app = document.querySelector(".app");
	let currentTemperature = document.querySelector(".current-temperature");
	let feels = document.querySelector(".current-temperature-feels-like");
	let humid = document.querySelector(".humidity");
	let visib = document.querySelector(".visibility");
	let cloud = document.querySelector(".cloud-cover");
	let uv = document.querySelector(".uvindex");
	let dew = document.querySelector(".dewpoint");
	let preci = document.querySelector(".precipitation");
	let windG = document.querySelector(".windgusts");
	let windS = document.querySelector(".windspeed");
	let press = document.querySelector(".pressure");
	let description = document.querySelector(".description");

	const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/9c49a2a83d8303815ab4ff58a644f7e7/24.932841,67.030406?units=ca`
		
			fetch(api)
			.then (response => {
				return response.json(); 
			})
			.then (data => {
				const { 
					temperature, 
					summary, 
					icon, 
					apparentTemperature,
					precipProbability,
					dewPoint,
					humidity,
					pressure,
					windSpeed,
					windGust,
					cloudCover,
					uvIndex,
					visibility 
				} = data.currently;

				//Conversions 
				let humidper = humidity * 100;
				let temp = temperature.toFixed(1);
				let feel = Math.floor(apparentTemperature);
				let visibf = visibility.toFixed();

				//Set DOM Elements From the API
				description.textContent = summary;
				currentTemperature.textContent = temp;
				feels.textContent = feel;
				dew.textContent = dewPoint;
				humid.textContent = humidper;
				press.textContent = pressure;
				windS.textContent = windSpeed;
				windG.textContent = windGust;
				cloud.textContent = cloudCover;
				uv.textContent = uvIndex;
				visib.textContent = visibf;
				preci.textContent = precipProbability;
				
				//Set icon
				setIcons(icon, document.querySelector(".icon"));

			});

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}
});


























//air quality

(function(w,d,t,f){  w[f]=w[f]||function(c,k,n){s=w[f],k=s['k']=(s['k']||(k?('&k='+k):''));s['c']=  
    c=(c  instanceof  Array)?c:[c];s['n']=n=n||0;L=d.createElement(t),e=d.getElementsByTagName(t)[0];  
    L.async=1;L.src='//feed.aqicn.org/feed/'+(c[n].city)+'/'+(c[n].lang||'')+'/feed.v1.js?n='+n+k;  
    e.parentNode.insertBefore(L,e);  };  })(  window,document,'script','_aqiFeed'  );   

   _aqiFeed({  
	   display:"<span style='%style;padding:2px 5px'>%impact</span><br/> (%aqiv)",
	   container:"city-aqi-container",  
	   city:"karachi"  
});   