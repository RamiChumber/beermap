import React, { Component } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Mapbox, {MapView} from "@rnmapbox/maps";

Mapbox.setAccessToken("pk.eyJ1IjoidHJ1Y2FyIiwiYSI6ImNtYmF4eW1kejBrbngyanNiMDV6cmhkZGUifQ.XDN6-TsN4oQ8jhiwd1Oguw");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: "tomato"
  },
  map: {
    flex: 1
  }
});

export default class App extends Component {
  componentDidMount() {
    Mapbox.setTelemetryEnabled(false);
  }

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            styleURL="mapbox://styles/trucar/cmbfonisj006l01r03k4d03e7"
            compassEnabled
            compassFadeWhenNorth
          >
            <Mapbox.Camera
              zoomLevel={12}
              centerCoordinate={[10.7522, 59.9139]}
            />
          </MapView>
        </View>
      </View>
    );
  }
}