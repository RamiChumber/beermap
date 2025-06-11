import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text, Pressable } from "react-native";
import Mapbox, { MapView, Camera, ShapeSource, CircleLayer, MarkerView } from "@rnmapbox/maps";
import osloBarsJson from "./assets/oslo_bars.json";



// Replace with your Mapbox access token
//oslo
// <Camera zoomLevel={12} centerCoordinate={[10.7522, 59.9139]} />

Mapbox.setAccessToken("pk.eyJ1IjoidHJ1Y2FyIiwiYSI6ImNtYmF4eW1kejBrbngyanNiMDV6cmhkZGUifQ.XDN6-TsN4oQ8jhiwd1Oguw");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const geojson = osloBarsJson as GeoJSON.FeatureCollection;


const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "tomato",
  },
  map: {
    flex: 1,
  },
  popup: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});


const App = () => {
  const [selectedFeature, setSelectedFeature] = useState<GeoJSON.Feature | null>(null); 
  
  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []);

  function zoomInCluster(coordinate: Object): void {
    console.log("Zooming?");
    
  }

  
  //console.log(geojson)

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          styleURL="mapbox://styles/trucar/cmbfonisj006l01r03k4d03e7"
          compassEnabled
          compassFadeWhenNorth
        >
          
          <Camera zoomLevel={12} centerCoordinate={[10.7522, 59.9139]} />

          <ShapeSource 
            id="geojson-source" 
            shape={geojson} 
            onPress={(e) => {
              const feature = e.features?.[0];
              if (feature?.properties?.cluster) {
                // Optional: Zoom into cluster
                zoomInCluster(e.coordinates);
              } else if (feature) {
                setSelectedFeature(feature);
              }
            }} 
            cluster={true} 
            clusterRadius={1}
            >
            <CircleLayer
              id="unclusteredPoints"
              filter={['!', ['has', 'point_count']]} // show only unclustered points
              style={{
                circleRadius: 7,
                circleColor: "#ff0000",
                
              }}
            />

            <CircleLayer
              id="clusteredPoints"
              filter={['has', 'point_count']} // show only clustered points
              style={{
                circleRadius: 10,
                circleColor: "#ff0000",
              }}
            />
          </ShapeSource>
        </MapView>

        {selectedFeature && selectedFeature.geometry.type === "Point" && (
          <MarkerView
            id="popup-marker"
            coordinate={selectedFeature.geometry.coordinates}
            anchor={{ x: 0.5, y: 1 }} // adjust to position above the point
          >
            <View style={styles.popup}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold", flex: 1 }}>
                  {selectedFeature.properties?.name}
                </Text>
                <Pressable onPress={() => setSelectedFeature(null)}>
                  <Text style={{ fontWeight: "bold" }}>✕</Text>
                </Pressable>
              </View>
              <Text>{selectedFeature.properties?.outdoor_seating}</Text>
            </View>
          </MarkerView>
        )}
      </View>
    </View>
  );
};

export default App;

// next: try to add the oslo bars geojson with clustering.
