function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: 41, lng: -85}
  });
}

var petfinder_URL ='https://api.petfinder.com/shelter.find?callback=?';
var markers=[];

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
      var latitude = parseInt(dataPath[i].latitude.$t);
      var longitude = parseInt(dataPath[i].longitude.$t);
    }
    addMarkers(latitude, longitude);
  }

function addMarkers(latitude, longitude){
  var myLatLng = new google.maps.LatLng(latitude, longitude);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
  markers.push(marker);
  google.maps.event.addListener(marker, 'click', (function(marker){
    return function(){
      infowindow.open(map);
    }
  })(marker));
}

function watchZipSubmit(){
  $(".search-button").on('click', zipcodeCallback);
}

$(function(){
  watchZipSubmit();
});



