let elementsData = []; 

async function fetchData() {
    const url = 'https://periodictable.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b59b9226ecmshb889e656e7000abp15ce22jsn722346169d42',
            'X-RapidAPI-Host': 'periodictable.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json(); 
        console.log('Fetched data:', data); 
        elementsData = data;
        displayData(elementsData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function displayData(elements) {
    const tableContainer = document.getElementById('table-container');

    tableContainer.innerHTML = '';

 
    if (Array.isArray(elements) && elements.length > 0) {
      
        const html = elements.map(element => `
            <div class="element">
                <h2>${element.name}</h2>
                <p>Symbol: ${element.symbol}</p>
                <p>Atomic Number: ${element.atomicNumber}</p>
                <p>Atomic Mass: ${element.atomicMass}</p>
                <p>Electronegativity: ${element.electronegativity}</p>
                <p>Melting Point: ${element.meltingPoint ? kelvinToCelsius(element.meltingPoint).toFixed(2) + ' °C' : 'N/A'}</p>
                <p>Boiling Point: ${element.boilingPoint ? kelvinToCelsius(element.boilingPoint).toFixed(2) + ' °C' : 'N/A'}</p>
                <p>Category: ${element.group}</p>
            </div>
        `).join('');

       
        tableContainer.innerHTML = html;
    } else {
 
        tableContainer.innerHTML = "<p>No data available</p>";
    }

    const elementsDivs = document.querySelectorAll('.element');
    elementsDivs.forEach(elementDiv => {
        elementDiv.addEventListener('mouseenter', () => {
            elementDiv.classList.add('enlarged');
        });
        elementDiv.addEventListener('mouseleave', () => {
            elementDiv.classList.remove('enlarged');
        });
    });
}



function searchElement() {
    const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    if (searchTerm === '') {
        alert('Please enter a text.');
    } else {

        const filteredElements = elementsData.filter(element =>
            element.name.toLowerCase().includes(searchTerm) || element.symbol.toLowerCase().includes(searchTerm)
        );
        displayData(filteredElements);
    }

}





window.onload = fetchData;