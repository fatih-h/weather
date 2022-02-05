import './styles/style.css';

/*Elements*/
const form = document.getElementById('form');
const loc = document.getElementById('location');
const content = document.getElementById('content');
const mainBox = document.getElementById('main');

(function(){

/*Default Location*/
data('Istanbul');


/*Pexels Api */
function image(people){
    let rand = Math.floor(Math.random() * 7);
    fetch("https://api.pexels.com/v1/search?query="+people+"&orientation=landscape",{
    headers: {
    Authorization: "563492ad6f917000010000017d97b57e03234870a3a6f8ea5a5df46d"
    }
    })
   .then(resp => resp.json())
   .then(data => { 
       console.log(data.photos[rand])
       let url = data.photos[rand].src.landscape;
       let shadowImg = "linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3))";

       mainBox.setAttribute('style',`background-image: ${shadowImg} ,url(${url})`);
    });       
}

/*Form Structure*/
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    data(loc.value);
    loc.value = "";
});

/* OpenWeatherMap Api*/
function data(getWeather){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+getWeather+'&units=metric&appid=10354683e2e4f6ac503236b20b4719e9')
    .then(response => response.json())
    .then(data => showCase(data))
    .catch(err=> console.log(err));
}

/* Filling content with Weather Data */
function showCase(data){
  
    if(data.cod == '200'){
        
        const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
        if(data.sys.country == 'TR'){
            image(regionNamesInEnglish.of(data.sys.country) +" country");
        }else{
            image(regionNamesInEnglish.of(data.sys.country));
            console.log(data.sys.country);
        }
        // mainBox.setAttribute('style','background-color:black');

        const box = document.createElement('div');
        const name = document.createElement('h3');
        const temp = document.createElement('h2');
        const icon = document.createElement('img');
        const main = document.createElement('h4');
        const feelsLike = document.createElement('p');
        const humidity = document.createElement('p');
        const wind = document.createElement('p');

        box.classList.add('weather-Box');
        name.textContent = data.name +" ," + data.sys.country;
        temp.textContent = Math.round(data.main.temp) + ' ℃';
        const iconUrl = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
        icon.setAttribute('src', iconUrl);
        main.textContent = data.weather[0].description;
        feelsLike.textContent = "Feels like: "+ Math.round(data.main.feels_like) + ' ℃';
        humidity.textContent = "Humidity levels: "+data.main.humidity + " %";
        wind.textContent = "Wind: "+ data.wind.speed + " km/h";

        name.setAttribute("style", "font-family: 'Libre Baskerville', serif;");
        temp.setAttribute("style", "font-family: 'Libre Baskerville', serif;");

        box.appendChild(name);
        box.appendChild(temp);
        box.appendChild(icon);
        box.appendChild(main);
        box.appendChild(feelsLike);
        box.appendChild(humidity);
        box.appendChild(wind);
        content.appendChild(box);
    }
    /*Delete previous search*/
    if(content.childElementCount>1){
        content.firstChild.remove();
    }
}


})();