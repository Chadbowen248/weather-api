	Number.prototype.between = function (min, max) {
	  return this >= min && this <= max;
	};

	var App = {
	  trackScale: 'F',
	  weather: [],
	  setBackground: function setBackground() {
	    var temp = this.weather[0].main.fahrenheit;
	    if (temp.between(-30, 0)) {
	      document.body.className = 'soCold';
	    }
	    if (temp.between(1, 45)) {
	      document.body.className = 'cold';
	    }
	    if (temp.between(46, 65)) {
	      document.body.className = 'fair';
	    }
	    if (temp.between(66, 85)) {
	      document.body.className = 'nice';
	    }
	    if (temp.between(86, 95)) {
	      document.body.className = 'hot';
	    }
	    if (temp.between(96, 130)) {
	      document.body.className = 'hothot';
	    }
	  },
	  render: function render() {
	    var tempSpan = document.getElementById('temp');
	    var city = document.getElementById('cityID');
	    document.getElementById('icon').className = 'wi wi-owm-' + this.weather[0].weather[0].id;
	    document.getElementById('desc').innerHTML = this.weather[0].weather[0].description.toUpperCase();
	    tempSpan.innerHTML = this.weather[0].main.fahrenheit + ' F';
	    city.innerHTML = this.weather[0].name.toUpperCase();
	  },
	  fadeIn: function fadeIn() {
	    document.querySelector('div').className = 'container';
	  },

	  geoLocation: {
	    success: function success(position) {
	      var lat = position.coords.latitude;
	      var lon = position.coords.longitude;
	      var URL = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=4329d407db5bab249c525bbdf75dc446';
	      fetch(URL).then(function (response) {
	        return response.json();
	      }).then(function (json) {
	        this.weather.push(json);
	        this.tempToFahrenheit();
	        this.tempToCelsuius();
	        this.setBackground();
	        this.render();
	        this.fadeIn();
	      }.bind(App));
	    },
	    error: function error() {
	      return 'error';
	    },
	    init: function init() {
	      navigator.geolocation.getCurrentPosition(this.success, this.error);
	      console.log('All the things added');
	    }
	  },
	  tempToFahrenheit: function tempToFahrenheit() {
	    var kelvinTemp = this.weather[0].main.temp;
	    var fahrenheit = 1.8 * (kelvinTemp - 273) + 32;
	    var rounded = Math.round(fahrenheit);
	    this.weather[0].main.fahrenheit = rounded;
	  },
	  tempToCelsuius: function tempToCelsuius() {
	    var kelvinTemp = this.weather[0].main.temp;
	    var celsius = kelvinTemp - 273.15;
	    var rounded = Math.round(celsius);
	    this.weather[0].main.celsius = rounded;
	  },
	  toggleTemp: function toggleTemp() {
	    var tempSpan = document.getElementById('temp');
	    if (this.trackScale === 'F') {
	      tempSpan.innerHTML = this.weather[0].main.celsius + ' C';
	      this.trackScale = 'C';
	    } else {
	      this.trackScale = 'F';
	      tempSpan.innerHTML = this.weather[0].main.fahrenheit + ' F';
	    }
	  }
	};

	window.onload = App.geoLocation.init();
