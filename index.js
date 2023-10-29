/*****************************INSTALLATION INSTRUCTIONS******************************************/

/*
* 1.Register on https://api.unsplash.com to get your API Key for the Unsplash API
* 2.Register on https://api.openweathermap.org to get your API Key for the OpenWeather API

* 3. Copy your keys from both websites and enter them as strings below like this:
*
*           let YOUR_UNSPLASH_API_KEY = {*YOUR_UNSPLASH_API_KEY*};
*           let YOUR_OPEN_WEATHER_API_KEY = {*YOUR_UNSPLASH_API_KEY*};
*
*           Example: let YOUR_UNSPLASH_API_KEY = '_oasijdiA7sd8nwe920923yn';
* 
* 4. The code is now ready to run on your localhost!  
*/

/**********************************************************************************************/

/***********INSERT HERE: ********************/
let YOUR_UNSPLASH_API_KEY = '';
let YOUR_OPEN_WEATHER_API_KEY = '';
/********************************************/



let img_url = '';
let img_author = '';
let img_default_url = 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080';
let img_default_author = 'Dodi Achmad'



initialize();

async function initialize() {
    await setBackground();
    await getCryptoDash();
    await getWeatherDash();
    getCurrentTimeDash();
}

async function getCryptoDash() {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    const data = await res.json();

    document.body.querySelector(".coins-top").innerHTML = `
                <img src=${data.image.small} />
                <span>${data.name}</span>
            `
    document.body.querySelector(".coins-container").innerHTML += `
            <div class="coins-data">
                <p>🎯: $${data.market_data.current_price.usd}</p>
                <p>👆: $${data.market_data.high_24h.usd}</p>
                <p>👇: $${data.market_data.low_24h.usd}</p>
            <div>
            `
}



async function getBackground() {
    const res = await fetch(`https://api.unsplash.com/photos/random?client_id=${YOUR_UNSPLASH_API_KEY}&orientation=landscape&query=forest`)
    const data = await res.json();
    console.log(data);
    img_author = data.user.name;
    img_url = data.urls.full;

}

async function setBackground() {
    const authorEl = document.body.querySelector('.img-author');

    try {
        await getBackground();
        authorEl.textContent = '(c) ' + img_author;
        document.body.style.backgroundImage = `url(${img_url})`;

    } catch (error) {

        console.error('occured in set : ' + error);
        document.body.style.backgroundImage = `url(${img_default_url})`;
        authorEl.textContent = '(c) ' + img_default_author;
    }

}

function getCurrentTimeDash() {
    const date = new Date()
    document.body.querySelector(".time-container").textContent = date.toLocaleTimeString("de", { timeStyle: "short" })
}

async function getWeatherDash() {

    navigator.geolocation.getCurrentPosition(success);

    async function success(position) {
        console.log(position)
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${YOUR_OPEN_WEATHER_API_KEY}`);
        const data = await res.json();
        console.log(data.clouds.all);
        const clouds = getCloudinessDesc(data.clouds.all);


        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.body.querySelector(".weather-container").innerHTML = `
        <img class="weather-icon" src=${iconUrl} />
        <p class="weather-clouds">${clouds}</p>
        <p class="weather-temp">${Math.round(data.main.temp)} ºC</p>
    `
        const res_city = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${YOUR_OPEN_WEATHER_API_KEY}`);
        const data_city = await res_city.json();
        document.body.querySelector(".weather-container").innerHTML += `
        <p class="weather-city">${data_city[0].local_names.de}, ${data.name}</p>
    `
    }
}


function getCloudinessDesc(cloudiness) {

    if (cloudiness >= 0 && cloudiness < 13) {
        return 'wolkenlos';
    }
    else if (cloudiness >= 13 && cloudiness < 38) {
        return 'leicht bewölkt';
    }
    else if (cloudiness >= 38 && cloudiness < 75) {
        return 'wolkig';

    } else if (cloudiness >= 75 && cloudiness < 88) {
        return 'stark bewölkt';

    } else if (cloudiness >= 88 && cloudiness < 100) {
        return 'bedeckt';

    }
}


