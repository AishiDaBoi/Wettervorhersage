$(document).ready(function () {
    let apiKey = '21123c650b8c6e1711c298ee618f6991';


    $('#getWeatherButton').click(function () {
        let city = $('#cityInput').val();

        if (city) {
            let url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}`;

            $.getJSON(url, function (data) {
                if (data && data.list) {
                    $('#weather_area').html('');

                    let forecastDays = {};

                    data.list.forEach(item => {
                        let date = item.dt_txt.split(' ')[0];
                        if (!forecastDays[date]) {
                            forecastDays[date] = [];
                        }
                        forecastDays[date].push(item);
                    });


                    Object.keys(forecastDays).forEach(date => {
                        let city = data.city.name;
                        let country = data.city.country;

                        let weatherHtml = `
                            <h2>${city}, ${country}</h2>
                        `;

                        $('#weather_area').add(weatherHtml);

                    });

                    Object.keys(forecastDays).forEach(date => {
                        let dailyData = forecastDays[date][0];
                        let city = data.city.name;
                        let country = data.city.country;
                        let dayName = new Date(date).toLocaleDateString('de-DE', { weekday: 'long' });
                        let temp = dailyData.main.temp - 273.15;
                        let description = dailyData.weather[0].description;
                        let icon = dailyData.weather[0].icon;



                        let weatherHtml = `
                            <div class="weatherBlock">
                                <p>${date}</p>
                                <h3>${dayName}</h3>
                                <p>Wetter: ${description}</p>
                                <p>Temperatur: ${temp.toFixed(1)}°C</p>
                                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Wetter Icon" height="50px" width="50px">
                            </div>
                        `;

                        $('#weather_area').append(weatherHtml);
                    });
                } else {
                    $('#weather_area').html('<p>Keine Wetterdaten gefunden.</p>');
                }
            }).fail(function () {
                $('#weather_area').html('<p>Fehler beim Abrufen der Daten. Bitte versuchen Sie es erneut.</p>');
            });
        } else {
            $('#weather_area').html('<p>Bitte geben Sie eine Stadt ein.</p>');
        }






    });



    function setCookie(cname, cvalue, exdays) {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    let savedCity = getCookie("cityInput");
    if (savedCity) {
        $("#cityInput").val(savedCity);
        $('#getWeatherButton').trigger('click');
    }

    $('#cityInput').on('input', function () {
        let cityValue = $(this).val();
        setCookie("cityInput", cityValue, 365);
    });
});
