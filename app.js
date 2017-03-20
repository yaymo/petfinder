var map;
var markers = [];
var myLatLng = [];

function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(33.7499, -84.3880),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    gestureHandling: 'cooperative'
  });
}

function renderMarkers(myLatLng, locations){
  for (i=0; i < myLatLng.length; i++){
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(myLatLng[i][0], myLatLng[i][1]),
      map: map
    });
    markers.push(marker);

    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function () {
        infowindow.setContent(locations[i]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }

  var centered = new google.maps.LatLng(myLatLng[2][0], myLatLng[3][1]);
  map.panTo(centered);
}


function clearMarkers(){
  for (var i =0; i<markers.length; i++){
    markers[i].setMap(null)
  };
}

function getMarkerData(results){
  var myLatLng = [];
  var locationNames = [];
  var shelterPhone;
  var shelterEmail;
  var dataPath = results.petfinder.shelters.shelter;
    for(var i=0; i<dataPath.length; i++){

      myLatLng.push([dataPath[i].latitude.$t, dataPath[i].longitude.$t]);

      if(dataPath[i].phone.$t == undefined){
        shelterPhone = "Sorry! No number listed";
      }
      else if(dataPath[i].phone.$t == '000-000-0000'){
        shelterPhone = 'Sorry! No number listed';
      }
      else{
        shelterPhone = dataPath[i].phone.$t;
      }

      if(dataPath[i].email.$t == undefined){
        shelterEmail = 'Sorry! No Email Listed'
      }
      else{
        shelterEmail = '<a href="mailto:"' + dataPath[i].email.$t + '>' + dataPath[i].email.$t + '</a>';
      }

      locationNames.push('<div class="location-obj"> <h3 class="name">' + dataPath[i].name.$t + '</h3>' +
        '<h4>' + dataPath[i].city.$t + ', ' + dataPath[i].state.$t + '</h4>' +
        '<h4>' + shelterPhone + '</h4>' +
        '<h4>Email us: ' + shelterEmail + '</h4> </div>' );

    }

 renderMarkers(myLatLng, locationNames);
 //renderShelterHTML(locationNames);
}

/*function renderShelterHTML(data){
  $('#locations').html(data);
}*/

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
  getShelterData(searchTerm, getMarkerData);
  $("#zip-search").val('');
}


function watchZipSubmit(){
  $("#submit-zip").on('click', zipcodeCallback);
}

$(function(){
  watchZipSubmit();
});



