// // for our data
// var myMap = L.map("map", {
//     center: [39.7392, -104.9903],
//     zoom: 8
//   });
  
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap);

// d3.json("imageserver.geojson",function(data){
//   console.log(data)
//   // L.geoJson function is used to parse geojson file and load on to map
//   L.geoJson(data).addTo(mymap)
  
//   });




 // for user location   
  navigator.geolocation.getCurrentPosition(function(lation) {
    // async
    console.log("in the callback")
    var latlng = new L.LatLng(lation.coords.latitude, lation.coords.longitude)
  
    var mymap = L.map('map').setView(latlng, 13)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: API_KEY
    }).addTo(mymap)
    var person = L.icon({
      iconUrl: 'characters1 copy.png',
  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

    var marker = L.marker(latlng , 
      {icon: person}).bindPopup('you are here').addTo(mymap)
    //   {
    //   stroke: true, //true/false for stroke
    //   color: 'red', //the color if stroke enabled
    //   opacity: 50, //a value between 0 and 1
    //   weight: 30, //stroke weight
    //   fill: true, //true/false for fill
    //   fillColor: '#FF0000', //HEX or color name
    //   fill0pacity: 1, //opacity 0-1 of fill
    //  }) .bindPopup('you are here').addTo(mymap)
    // rather than a marker, add a small circle, which will differentiate the
    // your location versus the others
    // find markers to add here
   d3.json("imageserver.geojson",function(data){
    console.log(data)
    // L.geoJson function is used to parse geojson file and load on to map
    L.geoJson(data).addTo(mymap)
    
    });
  
  
  
  });

 

  // // if you start adding markers here
  // console.log('after the thing')









  // How to give directions
    // a) on click of the marker, we need to call a service which 
    // can take the user's location from above, plus the location of the marker
    // then return a list of lat/longs which represent the "route to the place"
    // then you may need to display some HTML on the side of the map with directions
    //   google directions API:  start lat long, end lat long, route and text directions
    // iterate over all those directions and add a bunch of <li> right or left or under
    // the map
    // on click of the marker, the event or function should call a flask backend
    // OR just the gmaps API with JS, then parse the response and add it to the HTML
    // onEachFeature: google "leaflet on marker click event"




    function init() {
      // Grab a reference to the dropdown select element
      var selector = d3.select("#selDataset");
    
      // Use the list of sample names to populate the select options
      d3.json("imageserver.geojson").then((properties) => {
        sampleNames.forEach((sample) => {
          selector
            .append("option")
            .text(sample)
            .property("value", sample);
        });
    
        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
      });
    }
    
    function optionChanged(newSample) {
      // Fetch new data each time a new sample is selected
      buildCharts(newSample);
      buildMetadata(newSample);
    }
    
    // Initialize the dashboard
    init();
    