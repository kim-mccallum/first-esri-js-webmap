// Why is everything happening in this require function?
require(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer","esri/widgets/Locate"], function(Map, MapView,FeatureLayer,Locate) {

    const myMap = new Map({
      // basemap: "topo-vector"
      basemap: "satellite"
    });

    const view = new MapView({
      container: "viewDiv",
      map: myMap,
      center: [-118.684595,34.072],
      zoom: 12
    });

    // Define a popup for Trailheads
    const popupTrailheads = {
      "title": "Trailhead",
      "content": "<strong>Trail:</strong> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }
    
    // Create the layer and set the popup
    const trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
      popupTemplate: popupTrailheads
    });
        
    // Get the trailheads we are interested in
    trailheads.definitionExpression = "TRL_NAME = 'Backbone Trail'"
    // Add the layer
    myMap.add(trailheads);
  
  
    // Define a popup for Trails
    const popupTrails = {
      title: "Trail Information",
      content: function(){
         return "This is {TRL_NAME}, it is {LENGTH_MI} miles long with {ELEV_GAIN} ft of climbing."; 
      }
    }

    const trailRenderer = {
      type: "simple", 
      symbol: {
        type: "simple-line", 
        color: "#e600e6",
        width: 3
      }
    };
        
    // Create the layer and set the renderer
    const trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","ELEV_GAIN","LENGTH_MI"],
      popupTemplate: popupTrails,
      renderer: trailRenderer
    });


    //Get only the backbone trail
    trails.definitionExpression = "TRL_NAME = 'Backbone Trail'"

    // Add the layer
    myMap.add(trails,0);

    // Define a popup for the Woolsey Fire
    const popupFire = {
      title: "Woolsey Fire (2018) Perimeter",
      content: function(){
          return "Incident Name: Woolsey Fire, Approximate Area: 96,949 acres, Perimeter Creation Date: {DateCurrent}"; 
      }
    }

    const fireRenderer = {
      type: "simple", 
      symbol: {
        type: "simple-fill", 
        color: "#ff9933",
        outline: {
          color: "#ff3300",
          width: 3
        }
      }
    };

    // Create the layer and set the renderer
    const fire = new FeatureLayer({
      url: "https://services.arcgis.com/RmCCgQtiZLDCtblq/arcgis/rest/services/WoolseyFire_Perimeter/FeatureServer",
      outFields: ["IncidentName","GISAcres","DateCurrent"],
      popupTemplate: popupFire,
      opacity: 0.5,
      renderer: fireRenderer
    });

    myMap.add(fire,0);
   
    const openspaces = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
      outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
      // popupTemplate: popupOpenspaces
    });
  
    // Add the layer
    myMap.add(openspaces,0);

    // Add coordinates to the map
    var coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";

    view.ui.add(coordsWidget, "bottom-right");

    function showCoordinates(pt) {
      var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
          " | Scale 1:" + Math.round(view.scale * 1) / 1 +
          " | Zoom " + view.zoom;
      coordsWidget.innerHTML = coords;
    }

    view.watch("stationary", function(isStationary) {
      showCoordinates(view.center);
    });

    view.on("pointer-move", function(evt) {
      showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
    });

    const locateBtn = new Locate({
      view: view
    });

    // Add the locate widget to the top left corner of the view
    view.ui.add(locateBtn, {
      position: "top-left"
    });
  

});