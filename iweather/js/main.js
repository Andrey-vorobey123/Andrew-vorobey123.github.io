/* -------Modal------- */
const cartButton = document.querySelector("#sign");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const closee = document.querySelector(".button-in");

cartButton.addEventListener("click",toggleModal);
close.addEventListener("click", toggleModal);
closee.addEventListener("click" ,toggleModal);


function toggleModal(){
    modal.classList.toggle("is-open")
};
/* -------Weekdays------- */
let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
/* -------Appearing------- */
function SearchOpen(){
    const search = document.querySelector('.searching__block-animate');
    if (search.classList.contains('searching__block')) {
    search.classList.remove('searching__block');}
}
/* -------Scrolling to info------- */
function Scroll(){
    const scrr = document.getElementById('scroll');
    scrr.scrollIntoView({behavior: "smooth"});
}
/* -------Animation libriary------- */
new WOW().init();
/* -------Moskow weather------- */
fetch('https://api.openweathermap.org/data/2.5/weather?lang=en&q=Moscow&units=metric&appid=31ff62e5cc501559f6b2f4542a45a103')
.then(function (resp) { return resp.json() })
.then(function (data) {
    console.log(data);
    document.querySelector("#msk-ico").innerHTML = `<img src="../w-ico/${data.weather[0].icon}.png"/>`;
    document.querySelector("#msk-desc").innerHTML = (`${data.weather[0].description[0].toUpperCase()+data.weather[0].description.slice(1)}`);
    document.querySelector("#msk-temp").innerHTML += Math.round(data.main.temp) + '&deg;';
})
.catch(function () {
 
}); 
/* -------Geoposition weather------- */

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=31ff62e5cc501559f6b2f4542a45a103`)
        .then(function (lesp) { return lesp.json() })
        .then(function (datas) {
            console.log(datas);
            document.querySelector("#loc-ico").innerHTML = `<img src="../w-ico/${datas.weather[0].icon}.png"/>`;
            document.querySelector("#loc-desc").innerHTML = (`${datas.weather[0].description[0].toUpperCase()+datas.weather[0].description.slice(1)}`);
            document.querySelector("#loc-temp").innerHTML += Math.round(datas.main.temp) + '&deg;';
            document.querySelector("#loc-title").innerHTML = (`${datas.name}`);
        })
        .catch(function () {
 
        });
    });
}
/* -------Input can work on "Enter"------- */
(function() {
    document.querySelector('#sech-in').addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        getWeather();        
      }
    });
  })();
/* -------Get NOW searching weather------- */
function getWNow(d) {
    console.log(d);
    document.querySelector("#sech-name").innerHTML = (`${d.name}`);
    document.querySelector("#sech-ico").innerHTML = `<img src="../w-ico/${d.weather[0].icon}.png"/>`;
    document.querySelector("#sech-desc").innerHTML = (`${d.weather[0].description[0].toUpperCase()+d.weather[0].description.slice(1)}`);
    document.querySelector("#sech-temp-now").innerHTML = Math.round(d.main.temp) + '&deg;/';
    document.querySelector("#sech-temp-min").innerHTML = Math.round(d.main.temp_min) + '&deg;';
    document.querySelector('#sech-hum').innerHTML = d.main.humidity + ' %';
    document.querySelector('#sech-pres').innerHTML = d.main.pressure + ' hPa';
    document.querySelector('#sech-wind').innerHTML = Math.round(d.wind.speed) + ' mps';
    document.querySelector("#sech-feel").innerHTML = 'Feels like: ' + Math.round(d.main.feels_like) + '&deg;';
    /* let latt = d.coord.lat;
    let lonn = d.coord.lon; */
}
/* -------Get FORECAST searching weather------- */
function getWForecast(d) {
    console.log(d);
    let dt = new Date();
    for (i = 1; i < 5; i++){
        /* dt = new Date();
        
        console.log(dt.getDay());
        dt.setUTCSeconds(d.daily[i].dt);
        options = {weekday} */
        
        let date = new Date(dt.getTime() + i * 24 * 60 * 60 * 1000);
        document.getElementById(`forecast-week_${i}`).innerHTML = week[date.getDay()];
        document.getElementById(`forecast-icon_${i}`).innerHTML = `<img src="../w-ico/${d.daily[i].weather[0].icon}.png"/>`;
        document.getElementById(`forecast-tb_${i}`).innerHTML = Math.round(d.daily[i].temp.day) + '&deg;/';
        document.getElementById(`forecast-tm_${i}`).innerHTML = Math.round(d.daily[i].temp.min) + '&deg;';
        document.getElementById(`forecast-w_${i}`).innerHTML = Math.round(d.daily[i].wind_speed) + ' mps';
    
    }
}
/* -------Process of clicking on button------- */
let but = document.getElementById('sech-but');
but.addEventListener('click', getWeather);

/* -------The main process with first seaching fetch------- */
function getWeather() {
    let nazv = document.getElementById('sech-in').value;
    console.log("Searched: "+nazv);
    let url = "https://api.openweathermap.org/data/2.5/weather?&q=" + nazv + "&units=metric&appid=23ab152f74bf023e4fb59df8e570c895";

    let w_now = fetch(url).then(response => response.json());
    w_now.then(
        result => {
            if (result.cod === "404")
            alert("Incorrect city, try again")
            else{
            getWNow(result);
            w_now.then( function(datass){
                let latt = datass.coord.lat;
                let lonn = datass.coord.lon;
                console.log("Coords: "+ latt, lonn);
                CallF(latt, lonn);
            }
        
            );
            SearchOpen();
            Scroll();
            }
        },
        error => alert(error)
        
    );
   /*  w_now.then( function(datass){
        let latt = datass.coord.lat;
        let lonn = datass.coord.lon;
        console.log(latt, lonn);
        CallF(latt, lonn);
    }

    );
    SearchOpen();
    Scroll(); */
}
/* -------Second searching fetch------- */
function CallF(t1, t2){
    url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + t1 + "&lon=" + t2 + "&units=metric&exclude=current,hourly&appid=23ab152f74bf023e4fb59df8e570c895";
    let w_forecast = fetch(url).then(response => response.json());
    w_forecast.then(
        result => {
            if (result.cod === "404")
            alert("Error")
            else
            getWForecast(result);
        },
        errror => alert(error)
    );
}