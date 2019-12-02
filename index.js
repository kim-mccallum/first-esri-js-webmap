require([
    "esri/Map",
    "esri/views/SceneView"
    ], function(Map, SceneView) {

    var map = new Map({
    basemap: "topo-vector",
    ground: "world-elevation"  // show elevation
    });

    var view = new SceneView({
    container: "viewDiv",
    map: map,
    camera: {
        position: {  // observation point
        x: -118.80800,
        y: 33.96100,
        z: 25000 // altitude in meters
        },
        tilt: 65  // perspective in degrees
    }
    });
});