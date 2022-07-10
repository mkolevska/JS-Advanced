let nextBtn = document.getElementById("next");
let previousBtn = document.getElementById("previous");

 function planetInfo(element, planets) {
    element.innerHTML += `<th>
    <tr>
    <td>Planet Name:</td>
    <td>Planet opulation:</td>
    <td>Planet Climate:</td>
    <td>Planet Gravity:</td>
    </tr>
    </th>`
    for (let planet of planets) {
        element.innerHTML += `<tr>
        <td>${planet.name}</td>
        <td>${planet.population}</td>
        <td>${planet.climate}</td>
        <td>${planet.gravity}</td>
        </tr>`
    }
}

function getPlanets(planets) {
    let url = planets;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(planets) {
        console.log(planets);
        document.getElementById('table').innerText = '';
        let table = document.getElementById('table');
        planetInfo(table, planets.results)
    })
    .catch(function(error) {
        console.log(error)
    })
}
// Events

document.getElementById('showResuts')
.addEventListener('click', function() {
    getPlanets("https://swapi.dev/api/planets/?page=1");
    document.getElementById('next').style.display = 'block';
    document.getElementById('showResuts').style.visibility = 'hidden';
});

nextBtn.addEventListener('click', function() {
    getPlanets("https://swapi.dev/api/planets/?page=2");
    document.getElementById('next').style.display = 'none';
    document.getElementById('previous').style.display = 'block';

});

previousBtn.addEventListener('click', function() {
    getPlanets("https://swapi.dev/api/planets/?page=1");
    document.getElementById('next').style.display = 'block';
    document.getElementById('previous').style.display = 'none';
});

