import {Deck} from '@deck.gl/core';
import FlowMapLayer from '@flowmap.gl/core';
import mapboxgl from 'mapbox-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
};

// Set your mapbox token here
mapboxgl.accessToken = process.env.MapboxAccessToken; // eslint-disable-line


fetch(AIR_PORTS)
  .then(response => response.json())
  .then(featureCollection => {

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      // Note: deck.gl will be in charge of interaction and event handling
      interactive: false,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      bearing: INITIAL_VIEW_STATE.bearing,
      pitch: INITIAL_VIEW_STATE.pitch
    });

    new Deck({
      canvas: 'deck-canvas',
      width: '100%',
      height: '100%',
      initialViewState: INITIAL_VIEW_STATE,
      controller: true,
      onViewStateChange: ({viewState}) => {
        map.jumpTo({
          center: [viewState.longitude, viewState.latitude],
          zoom: viewState.zoom,
          bearing: viewState.bearing,
          pitch: viewState.pitch
        });
      },
      layers: [
        new FlowMapLayer({
          id: 'my-flowmap-layer',
          locations: featureCollection,
          flows: featureCollection.features.filter(f => f.properties.scalerank < 3),
          getFlowMagnitude: f => f.properties.scalerank,
          getFlowOriginId: f => 'LHR',
          getFlowDestId: f => f.properties.abbrev,
          getLocationId: f => f.properties.abbrev,
          getLocationCentroid: f => f.geometry.coordinates,
        })
      ]
    });


  });
