const loadAllCountries = async () => {
    const url = `https://restcountries.eu/rest/v2/all`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data);
    // matchName(data);
}

function displayData(data){
    const ul = document.querySelector('#list-box');
    // console.log(ul)
    data.forEach(data => {
        const li = document.createElement('li');
        li.dataset.name= data.name;
        li.innerHTML = `
        <img src="${data.flag}" width="30">
        <span>${data.name} </span>
        `;
        ul.appendChild(li)
        li.addEventListener('click', handleListName)

    })
}

async function handleListName(e){
    const countryName = e.currentTarget.dataset.name;
    const url = `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllinfo(data);

}

function displayAllinfo(data){
    const parentDiv = document.querySelector('#detail_info');
    parentDiv.innerHTML = `
        <div class="detail_info-1">
            <img src="${data[0].flag}" alt="">
            <h3>${data[0].name}</h3>
        </div>
        <div class="detail_info-2">
            <div class="detail_inner_info-1">
                <li><span>Capital</span>: ${data[0].capital}</li>
                <li><span>Language</span>: ${data[0].languages[0].name}</li>
                <li><span>Region</span>: ${data[0].region}</li>
                </div>
                <div class="detail_inner_info-2">
                <li><span>Currency</span>: ${data[0].currencies[0].code} (${data[0].currencies[0].symbol})</li>
                <li><span>Population</span>: ${data[0].population}</li>
                <li><span>Timezone</span>: ${data[0].timezones[0]}</li>
            </div>
        </div>
    `
}
loadAllCountries();