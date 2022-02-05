
const form = document.getElementById('form');
const loc = document.getElementById('location');
const content = document.getElementById('content');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    data(loc.value);
    loc.value = "";
});


function data(getWeather){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+getWeather+'&appid=10354683e2e4f6ac503236b20b4719e9')
    .then(response => response.json())
    .then(data => showCase(data))
    .catch(err=> console.log(err));
}


function showCase(data){
    
    if(data.cod != '404'){

    const box = document.createElement('div');

    const name = document.createElement('h1');
    const main = document.createElement('h2');
    const icon = document.createElement('img');
    const temp = document.createElement('p');

    box.classList.add('weather-data');
    
    name.textContent = data.name;
    main.textContent = data.weather[0].description;
    const iconUrl = 'https://openweathermap.org/img/wn/'+data.weather[0].icon+'@2x.png';
    icon.setAttribute('src', iconUrl);
    temp.textContent = data.main.temp;

    box.appendChild(name);
    box.appendChild(main);
    box.appendChild(icon);
    box.appendChild(temp);
    content.appendChild(box);
    }
}