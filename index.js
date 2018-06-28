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
            verbose: 1,
            info: 1
        },
        dataType: 'jsonp',
        type: 'GET',
        success: callback,
        error: handleError
    };

    $.ajax(settings);

}

function handleError(jqxhr, textStatus, errorThrown){
   console.log(errorThrown);
   console.log(jqxhr);
   console.log(textStatus);
    alert("There was error with the search. Please try again later");
}

function renderResults(result) {

    
    let name = result.Name;
    let teaser = result.wTeaser;
    let type = result.Type;
    let searchInput = $('#searchInput').val();

    if(type == "movie") {
        let uTubeBaseUrl = 'https://www.youtube.com/embed/' + result.yID;
          
        return `<div class="row rowStyle">
            <div class="col-4">
                <h3>${name}</h3>
                <div>${teaser}</div>
            </div>

            <div class="col-8">
                <iframe width="600" height="310" src="${uTubeBaseUrl}" 
                frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        </div>`;   

    } 
    else if (type == "book") {
        let wUrl = result.wUrl.replace("http", "https");
                return `
        <div class="row rowStyle">
            <div class="col-4">
                <h3>${name}</h3>
                <div>${teaser}</div>
            </div>

            <div class="col-8 book">
            <a target="_blank" href="${wUrl}">Wiki Link</a>
                <iframe width="600" height="310" src="${wUrl}" 
                frameborder="0" scrolling="no"></iframe>
            </div>
        </div>    
        `;
    }
}

function displayData(data) {

    const results = data.Similar.Results.map((item) => renderResults(item));
    let searchInput = $('#searchInput').val();
    console.log(results);
        if(results.length < 1){
            results.unshift(`<h3>Please refine search<h3>`);
    }

        else {
            results.unshift(`<h3>Recommendations based on "${searchInput}"</h3>`);
    }
            
    $('.js-search-results').html(results);
    $('#searchInput').val("");
    }

function watchSubmit() {
  $('#submit').submit(function(event){
    event.preventDefault();
    const searchTarget = $(event.currentTarget).find('#searchInput');
    let search = searchTarget.val();
    getDataFromApi(search, displayData);

  });
}

$(function(){ 
    watchSubmit();

    /*$(".js-search-results").on("click", ".book", function(event){
        event.preventDefault();
        let url = $(this).attr("src");
        let target = window.open(url, '_blank');

        if(target) {
            target.focus(); 
        } else{
            alert("please allow pop-ups for this website");
        }
    });*/
});
