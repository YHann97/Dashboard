
function loadDate() {
  var currentDate = new Date()
  var dateString = currentDate
    .toString()
    .split(' ')
    .splice(0, 4) // making the string contain only the first four words
    .join(' ')

  $('#date').text(dateString)
}

function loadWeather() {
	var weather = $('#weather')
	var url = 'https://api.openweathermap.org/data/2.5/weather' // OpenWeather API url
	var apiKey = '3d86add0816188bca880c327ff72094d' // API key from OpenWeather

	function success(position) {
		var latitude = position.coords.latitude
		var longitude = position.coords.longitude


		$.getJSON(
			url + '?units=kelvin&lat=' + latitude + '&lon=' + longitude + '&appid=' + apiKey,

			function (data) {

        console.log(data)

				let temp = data.main.temp;
				const celsius = (temp - 273);

				weather.text(
					'Based on your current location, it is ' +
					celsius.toFixed(2)
					+
					'° C right now'
				)
			}
		)
	}

	function error() {
		alert('Unable to retrieve your location for weather')
	}

	navigator.geolocation.getCurrentPosition(success, error)

	weather.text('fetching weather...')
}

function loadNews() {
  var news = $('#news')
  var url = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=' // News API url
  var apiKey = '12869c84c3d34015bfb03e3ae1448b0c' // API key from News API

  var realUrl = `https://server.fogeinator.repl.co/fetchJSON?url=${encodeURIComponent(url + apiKey)}`

$.getJSON(realUrl, function (data) {
  // map() method to call article urls and titles

  var titles = data.articles.map(function (articles) {
    return "<a href='" + articles.url + "'>" + articles.title + '</a>'
  })

  // joining the titles with two line breaks

  news.html(titles.join('<br><br>'))
})

// the text that will be displayed while the function is making the request
news.text('fetching news…')

}

function loadCovid(){

var global = $('#GloCases')
var malaysia = $('#MASCases')

var url = 'https://covid-api.mmediagroup.fr/v1/cases'

$.getJSON(url, function (data) {

  let glocases = data.Global.All.confirmed
  let mlycases = data.Malaysia.All.confirmed
				
  global.text('Global Confirmed Cases:' + glocases)
  malaysia.text("Malaysia's Confirmed Cases:" + mlycases)

}
)

}


loadCovid()
loadDate()
loadWeather()
loadNews()


