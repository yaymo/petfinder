/*function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: new google.maps.LatLng(37.09024, -95.712891),
    mapTypeId: 'terrain'
  });
}*/

var petfinder_URL ='https://api.petfinder.com/pet.find?callback=?';


function getPetData(params, callback){
  var query = {
    format: 'json',
    key:'2dd3916a40160c2090155ad9f7aeacb6'
  }
  var keys = Object.keys(params);
  for(var i=0; i<keys.length; i++){
    query[keys[i]] = params[keys[i]];
  }
  $.getJSON(petfinder_URL, query, callback);
}

function zipCallback(e){
  e.preventDefault();
  var params = {
    location: $('#zip-search').val()
  }
  getPetData(params, displayPetData);
}

function zipSubmit(){
  $(".search-button").on('click', zipCallback);
}

function displayPetData(results){
 if(results.petfinder.pets){
    results.petfinder.pets.pet.forEach(function(pet){
      var petList = '';
      /*if(pet.breeds.breed.length>0){*/
        for(var i=0; i<results.petfinder.pets.pet.length; i++){
          petList +='<li>' + results.petfinder.pets.pet[i].contact.address1.$t + '</li>';
      }
    /*}
      else {
        petList = '<li>' + pet.breeds.breed.$t + '</li>';
    }*/
    });
  }
  console.log(petList);
};

$(function(){
  zipSubmit();
});
