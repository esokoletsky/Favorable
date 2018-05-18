'use strict'
const searchURL = 'https://tastedive.com/api/similar';
const apiKey = '307871-MovieRec-UXN1RB47';
function getDataFromApi(searchTerm, callback) {
    const settings = {
        url: searchURL,
        data: {
            q: searchTerm,
            per_page: 5,
            k: apiKey,
            verbose: 1
        },
        dataType: 'jsonp',
        type: 'GET',
        success: callback
    };

    $.ajax(settings);
}

function renderResults(result) {

let uTubeBaseUrl = 'https://www.youtube.com/embed/' + result.yID;
let name = result.Name;
let teaser = result.wTeaser;
    return `
    <div class="row">
        <div class="col-4">
            <h3>${name}</h3>
            <div>${teaser}</div>
        </div>

        <div class="col-8">
            <iframe width="600" height="310" src="${uTubeBaseUrl}" 
            frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    </div>    
    `;


}

function displayData(data) {
    console.log(data);
    const results = data.Similar.Results.map((item) => renderResults(item));
    $('.js-search-results').append(results);
}

function watchSubmit() {
  $('#submit').submit(function(event){
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('#searchInput');
    let search = searchTarget.val();
    searchTarget.val('');
    getDataFromApi(search, displayData);
  });
}

$(watchSubmit());