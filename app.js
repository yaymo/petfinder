function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 41, lng: -85}
  });
}

var petfinder_URL ='https://api.petfinder.com/shelter.find?callback=?';

function getShelterData(searchTerm, callback){
  var query = {
    format: 'json',
    key:'2dd3916a40160c2090155ad9f7aeacb6'
  }
  var keys = Object.keys(searchTerm);
  for(var i=0; i<keys.length; i++){
    query[keys[i]] = searchTerm[keys[i]];
  }
  $.getJSON(petfinder_URL, query, callback);
}

function zipcodeCallback(event){
  event.preventDefault();
  var searchTerm = {
    location: $('#zip-search').val()
  }
  getShelterData(searchTerm, shelterLocations);
}


function shelterLocations(results){
  var shelterList = [];
  var dataPath = results.petfinder.shelters.shelter;
    for(var i=0; i<dataPath.length; i++){
      if(dataPath[i].address1.$t == undefined){
        continue;
      }
      if(dataPath[i].phone.$t == undefined){
        continue;
      }
      else{
      shelterList.push('<ul> <h3>' + dataPath[i].name.$t + '</h3>' +
        '<li>' + dataPath[i].address1.$t + '</li>' +
        '<li>' + dataPath[i].phone.$t + '</li>');
    }
  }
    $("#locations").html(shelterList);
}

function watchZipSubmit(){
  $(".search-button").on('click', zipcodeCallback);
}

$(function(){
  watchZipSubmit();
});



