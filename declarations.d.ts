declare module "*.geojson" {
  const value: GeoJSON.FeatureCollection;
  export default value;
}

// tells typescript how to handle non-code files