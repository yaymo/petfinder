var map;

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: new google.maps.LatLng(33.7490, -84.3880),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}

function renderMarkers(shelterList){
  //var shelterList=[[33.7490, -84.3880],[35, -85]];
 //declare var marker inside for loop put
  var infowindow = new google.maps.InfoWindow();
  for (i=0; i < shelterList.length; i++){
    var marker = new google.maps.Marker({
      //position:{lat: 33.7490, lng: -84.3880},
      position: new google.maps.LatLng(shelterList[i][0], shelterList[i][1]),
      map: map
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function () {
        infowindow.setContent(shelterList[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
}

//var shelterList=[];
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
      shelterList.push([dataPath[i].latitude.$t, dataPath[i].longitude.$t])
 }
 renderMarkers(shelterList);
}

function watchZipSubmit(){
  $(".search-button").on('click', zipcodeCallback);
}

$(function(){
  watchZipSubmit();
});



