


function watchForm(){
    let myForm = document.getElementById('searchForm');

    myForm.addEventListener('submit', (event)=>{
        console.log("submit");
        event.preventDefault();
        $('#results').empty();
        let country = $('#query').val();
        searchCountry(country);
    });
}

function searchCountry(country){
    let url= "https://restcountries.eu/rest/v2/name/"+country;
    console.log(country);
    $.ajax({
        url : url,
        method : "GET",
        dataType : "json",
        data:{
            name: country
        },
        success : function( responseJSON ){
            console.log(responseJSON);
            console.log(responseJSON[0].name);
            displayResults( responseJSON );
        },
        error : function( error ){
            console.log(error);
            displayError();
        }
      });
}

function displayError(){
    let results = document.getElementById('results');
    results.append(
        `
        <h1> País no existente </h1>
        `
    );
}

function displayResults(responseJSON){
    let name= responseJSON[0].name;
    let capital= responseJSON[0].capital;
    let flag= responseJSON[0].flag;
    let region= responseJSON[0].region;
    let population= responseJSON[0].population;
    let timezones= responseJSON[0].timezones;//aray
    let borders= responseJSON[0].borders;//array

    let results = document.getElementById('results');

    $('#results').append(`
        <div class="countryData">
        <h1> ${name} </h1>
        <h2> Capital: ${capital} </h2>
        <p> <img src= "${flag}"></p>
        <h3> Region: ${region} </h3>
        <p> Poblacion: ${population}</p>
        <p> Zona horaria: </p>
        </div>
            `
    )

    for(i=0; i<timezones.length;i++){
        $('#results').append(
            `
            <p> ${timezones[i]} </p>
            `
        );
    }
    $('#results').append(
        `
        <p> Colinda con:  </p>
        `
    );
    for(i=0; i<borders.length;i++){
        $('#results').append(
            `
            <p> ${borders[i]} </p>
            `
        );
    }
}

watchForm();
console.log("running");
