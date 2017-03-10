function initMap(){
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: new google.maps.LatLng(37.09024, -95.712891),
    mapTypeId: 'terrain'
  });
}

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
  getPetData(params, shelterData);
}

function zipSubmit(){
  $(".search-button").on('click', zipCallback);
}


//checking index to see if in array, if not add it. Problem is it's adding every object, not the uniques
/*function shelterData(results){
  var shelterList = [];
  var dataPath = results.petfinder.pets.pet;
  if(dataPath.length>0){
    for(var i=0; i<dataPath.length; i++){
      if(shelterList.indexOf(dataPath[i[.contact == -1)){
        shelterList.push(dataPath.contact[i]);
      }
    }
  }
}*/
//this actually works as expected, however i'd prefer not to use it since its a huge mess of objectives
/*function shelterData(results){
  var shelterList = [];
  var dataPath = results.petfinder.pets.pet;
  if(dataPath.length>0){
    dataPath.forEach(function(pet){
      shelterList.push(pet.contact);
    });
  }
}*/

//this is supposed to check if the contact object is in the array, if not add it. It's adding every object instead of uniques
/*function shelterData(results){
  var shelterList = [];
  var dataPath = results.petfinder.pets.pet;
  if(dataPath.length>0){
    for(var i=0; i<dataPath.length; i++){
      if(shelterList.includes(dataPath[i].contact){
        continue;
      }
      else{
        shelterList.push([dataPath[i].contact]);
      }
    }
  }
}


$(function(){
  zipSubmit();
});



