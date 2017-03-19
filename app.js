var map;
var markers = [];
var myLatLng = [];
var locationNames = [];
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(33.7499, -84.3880),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'cooperative'
  });
}

function renderMarkers(myLatLng){
  for (i=0; i < myLatLng.length; i++){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(myLatLng[i][0], myLatLng[i][1]),
      map: map
    });
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow({
      content: locationNames
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function () {
        infowindow.setContent(locationNames[i]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
  var centered = new google.maps.LatLng(myLatLng[2][0], myLatLng[2][1]);
  map.panTo(centered);
}


function clearMarkers(){
  for (var i =0; i<markers.length; i++){
    markers[i].setMap(null)
  };
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
  clearMarkers();
  getShelterData(searchTerm, getShelterLatLng);
}



function getShelterLatLng(results){
  var myLatLng = [];
  var locationNames = [];
  var dataPath = results.petfinder.shelters.shelter;
    for(var i=0; i<dataPath.length; i++){
      if(dataPath[i].name.$t == undefined){
        continue;
      }
      if(dataPath[i].phone.$t == undefined){
        continue;
      }
      myLatLng.push([dataPath[i].latitude.$t, dataPath[i].longitude.$t]);

      locationNames.push([dataPath[i].name.$t, dataPath[i].phone.$t]);
    }
 renderMarkers(myLatLng);
}


function watchZipSubmit(){
  $("#submit-zip").on('click', zipcodeCallback);
}

$(function(){
  watchZipSubmit();
});



