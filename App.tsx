import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Dimensions, Text, Pressable, Button } from "react-native";
import Mapbox, { MapView, Camera, ShapeSource, CircleLayer, MarkerView } from "@rnmapbox/maps";
import osloBarsJson from "./assets/oslo_bars.json";

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
    width: 200,
    height: 100,
    bottom: 200,
    left: 50,
    right: 50,
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
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null);
  const mapRef = useRef<Mapbox.MapView>(null);
  const cameraRef = useRef<Mapbox.Camera>(null);
  const [currentZoom, setCurrentZoom] = useState<number>(12);



  
  useEffect(() => {
    Mapbox.setTelemetryEnabled(false);
  }, []);

  function zoomInCluster(coordinate: Object): void {
    console.log("Zooming?");
    
  }


  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          styleURL="mapbox://styles/trucar/cmbfonisj006l01r03k4d03e7"
          compassEnabled
          compassFadeWhenNorth
          onRegionIsChanging={() => {
            setSelectedFeature(null);
            setPopupPosition(null);
          }}
          onRegionDidChange={(region) => {
            setCurrentZoom(region.properties.zoomLevel);
          }}
          onPress={() => {
            setSelectedFeature(null);
            setPopupPosition(null);
          }}
        >
          
          <Camera ref={cameraRef} zoomLevel={12} centerCoordinate={[10.7522, 59.9139]} />

          <ShapeSource 
            id="geojson-source"
            shape={geojson}
            cluster={true}
            clusterRadius={50}
            onPress={async (e) => {
              const feature = e.features?.[0];
              const coords: [number, number] = [e.coordinates.longitude, e.coordinates.latitude];
              if (feature?.properties?.cluster) {
                zoomInCluster(e.coordinates);
                const newZoom = Math.min(currentZoom + 2, 20);
                cameraRef.current?.setCamera({
                  centerCoordinate: coords,
                  zoomLevel: newZoom,
                  animationDuration: 400,
                  animationMode: "flyTo",
                });
                
              } else if (feature) {
                if (mapRef.current && feature.geometry.type === "Point") {
                  cameraRef.current?.flyTo(coords, 300);

                  setTimeout(async () => {
                    if (mapRef.current) {
                      const screenPoint = await mapRef.current.getPointInView(coords);
                      const [x, y] = screenPoint as [number, number];
                      setPopupPosition({ x, y });
                      setSelectedFeature(feature);
                    }
                  }, 350); // matches camera animation time
                  
                  //const screenPoint = await mapRef.current.getPointInView(coords);
                  //const [x, y] = screenPoint as [number, number];

                  //setPopupPosition({ x, y });
                }
              }
            }}

            hitbox={{ width: 20, height: 20 }}
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

        {popupPosition && selectedFeature && (
        <View
          style={[
            styles.popup,
            {
              position: "absolute",
              left: popupPosition.x - 100, // adjust for width
              top: popupPosition.y - 120,  // adjust for height
            },
          ]}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "bold", flex: 1 }}>
              {selectedFeature.properties?.name}
            </Text>
            
              <Button onPress={() => {
                setSelectedFeature(null);
                setPopupPosition(null);
              }} title="X"/>
            
          </View>
          <Text>{selectedFeature.properties?.outdoor_seating}</Text>
        </View>
      )}
      </View>
    </View>
  );
};

export default App;
