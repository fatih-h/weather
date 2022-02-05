import './styles/style.css';


const form = document.getElementById('form');
const loc = document.getElementById('location');
const content = document.getElementById('content');

(function(){
data('Istanbul');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    data(loc.value);
    loc.value = "";
});


function data(getWeather){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+getWeather+'&units=metric&appid=10354683e2e4f6ac503236b20b4719e9')
    .then(response => response.json())
    .then(data => showCase(data))
    .catch(err=> console.log(err));
}

function showCase(data){
  
    if(data.cod == '200'){
        
        const box = document.createElement('div');
        const name = document.createElement('h2');
        const temp = document.createElement('h4');
        const icon = document.createElement('img');
        const main = document.createElement('h3');
        const feelsLike = document.createElement('p');
        const humidity = document.createElement('p');
        const wind = document.createElement('p');

        box.classList.add('weather-Box');
        name.textContent = data.name +" ," + data.sys.country;
        temp.textContent = data.main.temp + ' ℃';
        const iconUrl = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
        icon.setAttribute('src', iconUrl);
        main.textContent = data.weather[0].description;
        feelsLike.textContent = "Feels like: "+ data.main.feels_like + ' ℃';
        humidity.textContent = "Humidity levels: "+data.main.humidity + " %";
        wind.textContent = "Wind: "+ data.wind.speed + " km/h";

       
        box.appendChild(name);
        box.appendChild(temp);
        box.appendChild(icon);
        box.appendChild(main);
        box.appendChild(feelsLike);
        box.appendChild(humidity);
        box.appendChild(wind);
        content.appendChild(box);
    }
    if(content.childElementCount>1){
        content.firstChild.remove();
    }
}


})();