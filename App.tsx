import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Mapbox, { MapView, Camera, ShapeSource, CircleLayer } from "@rnmapbox/maps";

// Replace with your Mapbox access token
//oslo
// <Camera zoomLevel={12} centerCoordinate={[10.7522, 59.9139]} />

Mapbox.setAccessToken("pk.eyJ1IjoidHJ1Y2FyIiwiYSI6ImNtYmF4eW1kejBrbngyanNiMDV6cmhkZGUifQ.XDN6-TsN4oQ8jhiwd1Oguw");

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const geojson: GeoJSON.FeatureCollection = 
  {
"type": "FeatureCollection",
"features": [
{ "type": "Feature", "properties": { "element": "node", "id": 288416026, "amenity": "bar", "check_date": "2023-06-03", "name": "Svanen Cocktailbar", "outdoor_seating": "yes", "toilets:wheelchair": "yes", "website": "https://www.svanenoslo.no", "wheelchair": "no", "contact:instagram": null, "indoor_seating": null, "opening_hours:signed": null, "opening_hours": null, "fax": null, "phone": null, "noname": null, "not:name": null, "description": null, "brewery": null, "changing_table": null, "drink:beer": null, "drink:cocktail": null, "drink:whisky": null, "drink:wine": null, "toilets": null, "toilets:access": null, "toilets:disposal": null, "toilets:gender_segregated": null, "toilets:hands_drying": null, "toilets:handwashing": null, "toilets:paper_supplied": null, "contact:facebook": null, "cuisine": null, "internet_access": null, "internet_access:fee": null, "contact:email": null, "contact:phone": null, "check_date:opening_hours": null, "microbrewery": null, "min_age": null, "payment:app": null, "payment:cards": null, "payment:cash": null, "payment:credit_cards": null, "payment:debit_cards": null, "smoking": null, "email": null, "twitter": null, "fixme": null, "name:en": null, "note": null, "source": null, "diet:vegan": null, "diet:vegetarian": null, "image": null, "operator": null, "live_music": null, "level": null, "cocktails": null, "facebook": null, "website:menu": null, "lgbtq": null, "wikidata": null, "wikipedia": null, "club": null, "sport": null, "addr:housenumber": null, "addr:street": null, "addr:postcode": null, "start_date": null, "bar": null, "indoor": null, "type": null, "building": null, "building:levels": null, "ref:bygningsnr": null, "roof:shape": null }, "geometry": { "type": "Point", "coordinates": [ 10.7447916, 59.9123665 ] } },
{ "type": "Feature", "properties": { "element": "node", "id": 292135704, "amenity": "bar", "check_date": "2023-02-19", "name": "Parkteateret", "outdoor_seating": null, "toilets:wheelchair": null, "website": null, "wheelchair": "no", "contact:instagram": null, "indoor_seating": null, "opening_hours:signed": null, "opening_hours": null, "fax": null, "phone": null, "noname": null, "not:name": null, "description": null, "brewery": null, "changing_table": null, "drink:beer": null, "drink:cocktail": null, "drink:whisky": null, "drink:wine": null, "toilets": null, "toilets:access": null, "toilets:disposal": null, "toilets:gender_segregated": null, "toilets:hands_drying": null, "toilets:handwashing": null, "toilets:paper_supplied": null, "contact:facebook": null, "cuisine": null, "internet_access": null, "internet_access:fee": null, "contact:email": null, "contact:phone": null, "check_date:opening_hours": null, "microbrewery": null, "min_age": null, "payment:app": null, "payment:cards": null, "payment:cash": null, "payment:credit_cards": null, "payment:debit_cards": null, "smoking": null, "email": null, "twitter": null, "fixme": null, "name:en": null, "note": null, "source": null, "diet:vegan": null, "diet:vegetarian": null, "image": null, "operator": null, "live_music": null, "level": null, "cocktails": null, "facebook": null, "website:menu": null, "lgbtq": null, "wikidata": null, "wikipedia": null, "club": null, "sport": null, "addr:housenumber": null, "addr:street": null, "addr:postcode": null, "start_date": null, "bar": null, "indoor": null, "type": null, "building": null, "building:levels": null, "ref:bygningsnr": null, "roof:shape": null }, "geometry": { "type": "Point", "coordinates": [ 10.7583654, 59.9234961 ] } },
{ "type": "Feature", "properties": { "element": "node", "id": 292143391, "amenity": "bar", "check_date": "2024-07-15", "name": "Jimmy’s", "outdoor_seating": "yes", "toilets:wheelchair": null, "website": null, "wheelchair": "no", "contact:instagram": "https://www.instagram.com/jimmysoslo/", "indoor_seating": "yes", "opening_hours:signed": null, "opening_hours": null, "fax": null, "phone": null, "noname": null, "not:name": null, "description": null, "brewery": null, "changing_table": null, "drink:beer": null, "drink:cocktail": null, "drink:whisky": null, "drink:wine": null, "toilets": null, "toilets:access": null, "toilets:disposal": null, "toilets:gender_segregated": null, "toilets:hands_drying": null, "toilets:handwashing": null, "toilets:paper_supplied": null, "contact:facebook": null, "cuisine": null, "internet_access": null, "internet_access:fee": null, "contact:email": null, "contact:phone": null, "check_date:opening_hours": null, "microbrewery": null, "min_age": null, "payment:app": null, "payment:cards": null, "payment:cash": null, "payment:credit_cards": null, "payment:debit_cards": null, "smoking": null, "email": null, "twitter": null, "fixme": null, "name:en": null, "note": null, "source": null, "diet:vegan": null, "diet:vegetarian": null, "image": null, "operator": null, "live_music": null, "level": null, "cocktails": null, "facebook": null, "website:menu": null, "lgbtq": null, "wikidata": null, "wikipedia": null, "club": null, "sport": null, "addr:housenumber": null, "addr:street": null, "addr:postcode": null, "start_date": null, "bar": null, "indoor": null, "type": null, "building": null, "building:levels": null, "ref:bygningsnr": null, "roof:shape": null }, "geometry": { "type": "Point", "coordinates": [ 10.7575314, 59.9192355 ] } },
{ "type": "Feature", "properties": { "element": "node", "id": 292143395, "amenity": "bar", "check_date": "2025-05-10", "name": "Bar Boca", "outdoor_seating": null, "toilets:wheelchair": null, "website": "https://www.facebook.com/BarBocaOslo", "wheelchair": "no", "contact:instagram": null, "indoor_seating": null, "opening_hours:signed": "no", "opening_hours": null, "fax": null, "phone": null, "noname": null, "not:name": null, "description": null, "brewery": null, "changing_table": null, "drink:beer": null, "drink:cocktail": null, "drink:whisky": null, "drink:wine": null, "toilets": null, "toilets:access": null, "toilets:disposal": null, "toilets:gender_segregated": null, "toilets:hands_drying": null, "toilets:handwashing": null, "toilets:paper_supplied": null, "contact:facebook": null, "cuisine": null, "internet_access": null, "internet_access:fee": null, "contact:email": null, "contact:phone": null, "check_date:opening_hours": null, "microbrewery": null, "min_age": null, "payment:app": null, "payment:cards": null, "payment:cash": null, "payment:credit_cards": null, "payment:debit_cards": null, "smoking": null, "email": null, "twitter": null, "fixme": null, "name:en": null, "note": null, "source": null, "diet:vegan": null, "diet:vegetarian": null, "image": null, "operator": null, "live_music": null, "level": null, "cocktails": null, "facebook": null, "website:menu": null, "lgbtq": null, "wikidata": null, "wikipedia": null, "club": null, "sport": null, "addr:housenumber": null, "addr:street": null, "addr:postcode": null, "start_date": null, "bar": null, "indoor": null, "type": null, "building": null, "building:levels": null, "ref:bygningsnr": null, "roof:shape": null }, "geometry": { "type": "Point", "coordinates": [ 10.7593699, 59.9252056 ] } },
]
}

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
              const feature = e.features?.[0].properties.name
              if (feature?.properties?.cluster) {
                // Optional: Zoom into cluster
                zoomInCluster(e.coordinates);
              } else {
                console.log(feature)
                //setSelectedFeature(feature);
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
              {selectedFeature.properties?.name}
            </Text>
            <Text>{selectedFeature.properties?.outdoor_seating}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default App;

// next: try to add the oslo bars geojson with clustering.
