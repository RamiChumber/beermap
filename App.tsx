import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Mapbox, { MapView, Camera, ShapeSource, CircleLayer } from "@rnmapbox/maps";

// Replace with your Mapbox access token
//oslo
// <Camera zoomLevel={12} centerCoordinate={[10.7522, 59.9139]} />

Mapbox.setAccessToken("pk.eyJ1IjoidHJ1Y2FyIiwiYSI6ImNtYmF4eW1kejBrbngyanNiMDV6cmhkZGUifQ.XDN6-TsN4oQ8jhiwd1Oguw");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const geojson: GeoJSON.FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-77.032, 38.913]
      },
      properties: {
        title: 'Mapbox',
        description: 'Washington, D.C.'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.414, 37.776]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.614, 37.876]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-122.214, 37.676]
      },
      properties: {
        title: 'Mapbox',
        description: 'San Francisco, California'
      }
    },
  ]
};

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
          
          <Camera zoomLevel={2} centerCoordinate={[-100, 39]} />
          <ShapeSource 
            id="geojson-source" 
            shape={geojson} 
            onPress={(e) => {
              const feature = e.features?.[0];
              if (feature?.properties?.cluster) {
                // Optional: Zoom into cluster
                zoomInCluster(e.coordinates);
              } else {
                setSelectedFeature(feature);
              }
            }} 
            cluster={true} 
            clusterRadius={50}
            >
            <CircleLayer
              id="unclusteredPoints"
              filter={['!', ['has', 'point_count']]} // show only unclustered points
              style={{
                circleRadius: 8,
                circleColor: "#ff0000",
                circleStrokeWidth: 2,
                circleStrokeColor: "#ffffff",
              }}
            />

            <CircleLayer
              id="clusteredPoints"
              filter={['has', 'point_count']} // show only clustered points
              style={{
                circleColor: '#00BCD4',
                circleRadius: 10,
                
              }}
            />
          </ShapeSource>
        </MapView>

        {selectedFeature && (
          <View style={styles.popup}>
            <Text style={{ fontWeight: 'bold' }}>
              {selectedFeature.properties?.title}
            </Text>
            <Text>{selectedFeature.properties?.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default App;

// next: try to add the oslo bars geojson with clustering.
