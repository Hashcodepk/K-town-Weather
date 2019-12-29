window.addEventListener("load", () => {
    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('sw.js');
            console.log('SW registered');

        } catch (error) {
            console.log('SW failed');
		}
    }
    
	let description = document.querySelector(".description");
	let currentTemperature = document.querySelector(".current-temperature");
	let feels = document.querySelector(".current-temperature-feels-like");
	let feelsshade = document.querySelector(".current-temperature-feels-like-shade");
	let humid = document.querySelector(".humidity");
	let visib = document.querySelector(".visibility");
	let cloud = document.querySelector(".cloud-cover");
	let uv = document.querySelector(".uv-index");
	let uvt = document.querySelector(".uv-text");
	let dew = document.querySelector(".dewpoint");
	let preci = document.querySelector(".precipitation");
	let windG = document.querySelector(".windgusts");
	let windS = document.querySelector(".windspeed");
	let windD = document.querySelector(".windd");
	let press = document.querySelector(".pressure");
	let ceil = document.querySelector(".ceiling");
	let past24 = document.querySelector(".past24");
	let forcastHigh = document.querySelector(".forcast-high");
	let forcastHighFeel = document.querySelector(".forcast-high-feel");
	let forcastLow = document.querySelector(".forcast-low");
	let forcastLowFeel = document.querySelector(".forcast-low-feel");
	let day = document.querySelector(".day");
	let night = document.querySelector(".night");
	let sunrise = document.querySelector(".sunrise");
	let sunset = document.querySelector(".sunset");
	let hos = document.querySelector(".hos");
	let forcast = document.querySelector(".forcast");

	

	const proxy = "https://cors-anywhere.herokuapp.com/";
	const api = `${proxy}https://api.darksky.net/forecast/9c49a2a83d8303815ab4ff58a644f7e7/24.932841,67.030406?units=ca`
		
			fetch(api)
			.then (response => {
				return response.json(); 
			})
			.then (data => {
				const { summary, icon, } = data.currently;

				//Setting Summary and Icon Elements From the API
				description.textContent = summary;
				setIcons(icon, document.querySelector(".icon"));

			});

	function setIcons(icon, iconID) {
		const skycons = new Skycons({ color: "white" });
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();
		skycons.play();
		return skycons.set(iconID, Skycons[currentIcon]);
	}

	const accu_api = `https://dataservice.accuweather.com/currentconditions/v1/260803?apikey=SurGM538ksuF4wAkU1A11mwPGqBXDAWc&details=true`;

	fetch(accu_api)
	.then(response => {
		return response.json()
	})
	.then(data => {
		const { 
			Temperature,
			RealFeelTemperature,
			RealFeelTemperatureShade,
			RelativeHumidity,
			Visibility,
			CloudCover,
			UVIndex, 
			UVIndexText,
			DewPoint,
			PrecipitationSummary,
			WindGust,
			Wind,
			Pressure,
			Ceiling,
			TemperatureSummary
		 } = data[0]


		 // CONVERSIONS
		 let temp = Math.round(Temperature.Metric.Value);
		 let tempfeels = Math.round(RealFeelTemperature.Metric.Value);
		 let tempfeelshade = Math.round(RealFeelTemperatureShade.Metric.Value);
		 let wg = Math.round(WindGust.Speed.Metric.Value);
		 let ws = Math.round(Wind.Speed.Metric.Value);
		 let dp = Math.round(DewPoint.Metric.Value);

		currentTemperature.textContent = temp;
		feels.textContent = tempfeels;
		feelsshade.textContent = tempfeelshade;
		humid.textContent = RelativeHumidity;
		visib.textContent = Visibility.Metric.Value;
		cloud.textContent = CloudCover;
		uv.textContent = UVIndex;
		uvt.textContent = UVIndexText;
		dew.textContent = dp;
		preci.textContent = PrecipitationSummary.Precipitation.Metric.Value;
		windG.textContent = wg;
		windS.textContent = ws;
		windD.textContent = Wind.Direction.Localized;
		press.textContent = Pressure.Metric.Value;
		ceil.textContent = Ceiling.Metric.Value;
		past24.textContent = TemperatureSummary.Past24HourRange.Minimum.Metric.Value
	
	})

	const accu_forcast_api = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/260803?apikey=SurGM538ksuF4wAkU1A11mwPGqBXDAWc&details=true&metric=true`;

	fetch(accu_forcast_api)
	.then(response => {
		return response.json()
	})
	.then(data => {
		// CONVERSiONS

		function Unix_to_norm(t)
		{
		var dt = new Date(t*1000);
		var hr = dt.getHours();
		var m = "0" + dt.getMinutes();
		var s = "0" + dt.getSeconds();
		return hr+ ':' + m.substr(-2);  
		}

		const sun = Unix_to_norm(data.DailyForecasts[0].Sun.EpochRise);
		const set = Unix_to_norm(data.DailyForecasts[0].Sun.EpochSet);

		let fh = Math.round(data.DailyForecasts[0].Temperature.Maximum.Value);
		let fhf = Math.round(data.DailyForecasts[0].RealFeelTemperature.Maximum.Value);
		let fl = Math.round(data.DailyForecasts[0].Temperature.Minimum.Value);
		let flf = Math.round(data.DailyForecasts[0].RealFeelTemperature.Minimum.Value);

		
		// DOM

		forcastHigh.textContent = fh;
		forcastHighFeel.textContent = fhf;
		forcastLow.textContent = fl;
		forcastLowFeel.textContent = flf;
		day.textContent = data.DailyForecasts[0].Day.ShortPhrase;
		night.textContent = data.DailyForecasts[0].Night.ShortPhrase;
		sunrise.textContent = sun;
		sunset.textContent = set;
		hos.textContent = data.DailyForecasts[0].HoursOfSun;
		forcast.textContent = data.Headline.Text;
	})	



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