require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery", 
    "esri/layers/FeatureLayer"
  ], function(Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer) {

    var map = new Map({
    basemap: "topo-vector",
    ground: "world-elevation"  // show elevation
    });

    // 2-d
    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80543,34.02700],
        zoom: 13
      });

    // Add layers
    // Trailheads feature layer (points)
    var trailheadsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    map.add(trailheadsLayer);
    
    // Trails feature layer (lines)
    var trailsLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
    });

    map.add(trailsLayer, 0);

    // Parks and open spaces (polygons)
    var parksLayer = new FeatureLayer({
    url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    map.add(parksLayer, 0);

    // Static
    // var basemapToggle = new BasemapToggle({
    //     view: view,
    //     nextBasemap: "satellite"
    //   });

    // Toggle
    var basemapGallery = new BasemapGallery({
        view: view,
        source: {
          portal: {
            url: "http://www.arcgis.com",
            useVectorBasemaps: true, // Load vector tile basemap group
          },
        } 
      });

    view.ui.add(basemapGallery, "top-right"); // Add to the view
});