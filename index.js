require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer"
  ],
  function(
    Map, 
    MapView,
    FeatureLayer
  ) {

    var map = new Map({
      basemap: "topo-vector"
    });

    var view = new MapView({
      container: "viewDiv",
      map: map,
      center: [-118.80543,34.02700],
      zoom: 13
    });

    // Define a popup for Trailheads
    var popupTrailheads = {
      "title": "Trailhead",
      "content": "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
    }
    
    // Create the layer and set the popup
    var trailheads = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","CITY_JUR","X_STREET","PARKING","ELEV_FT"],
      popupTemplate: popupTrailheads
    });
        
    // Add the layer
    map.add(trailheads);
  
  
    // Define a popup for Trails
    var popupTrails = {
      title: "Trail Information",
      content: function(){
         return "This is {TRL_NAME} with {ELEV_GAIN} ft of climbing."; 
      }
    }
        
    // Create the layer and set the renderer
    var trails = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0",
      outFields: ["TRL_NAME","ELEV_GAIN"],
      popupTemplate: popupTrails
    });
  
    // Add the layer
    map.add(trails,0);
  
    // Define popup for Parks and Open Spaces
    var popupOpenspaces = {
      "title": "{PARK_NAME}",
      "content": [{
        "type": "fields",
        "fieldInfos": [
          {
            "fieldName": "AGNCY_NAME",
            "label": "Agency",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "TYPE",
            "label": "Type",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "ACCESS_TYP",
            "label": "Access",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": null,
            "stringFieldOption": "text-box"
          },
          {
            "fieldName": "GIS_ACRES",
            "label": "Acres",
            "isEditable": true,
            "tooltip": "",
            "visible": true,
            "format": {
              "places": 2,
              "digitSeparator": true
            },
            "stringFieldOption": "text-box"
          }
        ]
      }]
    }
  
    var openspaces = new FeatureLayer({
      url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
      outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
      popupTemplate: popupOpenspaces
    });
  
    // Add the layer
    map.add(openspaces,0);

});