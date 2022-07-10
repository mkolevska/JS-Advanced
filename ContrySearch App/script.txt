let baseUrl = `https://restcountries.com/v3.1`;
let allContryUrl = `https://restcountries.com/v3.1/all`
let sortedData = [];
let cityName = '';
let arr = [];

async function getContryInfo(url) {
    try {
        document.getElementById('loader').style.display = 'block';
        return await fetch(url).then(response => response.json());
    }
    catch (error) {
        console.log(error);

    }
    finally {
        document.getElementById('loader').style.display = 'none';
    }

}

function showContryResults(country) {

    let table = document.getElementById('table-body');
    table.innerHTML = '';
    table.innerHTML = `
     <thead>
            <th>Flags</th>
            <th>Name</th>
            <th>Population</th>
            <th>Capitol</th>
            <th>Area</th>
            <th>Currency</th>
            <th>Languages</th>
        </thead>`
    country.forEach(contry => {
        let currencies = Object.values(country?.currencies || '');
        let languages = Object.values(country?.languages || '');
        let row = document.createElement('tr');
        row.innerHTML = `<td><img src= '${contry.flags.png}' alt = "Flag of ${contry.name.common}"></td>
        <td>${contry.name.common}</td>
        <td>${contry.population}</td>
        <td>${contry.capital}</td>
        <td>${contry.area}</td>
        <td>${currencies?.map(currency => currency.name).join(',') || ''}</td>
        <td>${languages?.map(languages => languages).join(',') || ''}</td>
        `;
       
        table.append(row);

    })
}
//Sorting Elements

async function sortDataBy(arr, value) {
    

    switch (value) {
        case 'A-Z':
            sortedData = arr.sort((a, b) => a.name.common.localeCompare(b.name.common));
            break;
        case 'population':
            sortedData = arr.sort((a, b) => b.population - a.population);
            break;
        case 'area':
            sortedData = arr.sort((a, b) => a.area - b.area);
            break;
        default:
            break;
    }
    console.log(sortedData);
    return sortedData;

}

//Reusable
let result = document.getElementById('result');
result.style.display = 'none';
let homePage = document.getElementById('main-container');

//Events
document
    .getElementById('search-city')
    .addEventListener('click', async () => {
        homePage.style.display = 'block';
        result.style.display = 'block';
     cityName = document.getElementById('city-name').value;
        if (cityName === "") {
            alert('Please insert Contry');
            result.style.display = 'none';
        }
        // console.log(cityName);
        let contryUrl = `${baseUrl}/name/${cityName}`;
        let response = await getContryInfo(contryUrl);
        let responseContry = response.map(response => response);
        arr.push(...responseContry);

        console.log(arr);
        showContryResults(response);
    })

// Sort by Name, Population, Area-size
document
    .getElementById('select-how-to-order')
    .addEventListener('change', async (event) => {
        event.preventDefault();
        value = event.target.value;
        console.log(value);
        let contryUrl =`${baseUrl}/name/${cityName}`;
        let data = await sortDataBy(arr,value);
        showContryResults(data);
        

    })