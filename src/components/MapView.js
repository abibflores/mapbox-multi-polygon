import { Map, Popup } from "mapbox-gl";
import React, { useEffect, useRef, useState } from "react";

export const MapView = () => {

    const mapElement = useRef(null)

    useEffect(() => {
        const map = new Map({
            container: mapElement.current, // container ID
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [-99.1869915058011, 19.4361393157463],
            zoom: 15
        });
    
        map.on('load', () => {
            // Add a source for the state polygons.
            map.addSource('states', {
            'type': 'geojson',
            'data': "/static/data.geojson"
            });
        
            // Add a layer showing the state polygons.
            map.addLayer({
            'id': 'states-layer',
            'type': 'fill',
            'source': 'states',
            'paint': {
            'fill-color': 'rgba(50, 193, 255, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
            }
            });
             
            // When a click event occurs on a feature in the states layer,
            // open a popup at the location of the click, with description
            // HTML from the click event's properties.
            map.on('click', 'states-layer', (e) => {
            new Popup()
            .setLngLat(e.lngLat)
            .setHTML(`${e.features[0].properties.address} ${e.features[0].properties.fid} ${e.features[0].properties.lot_price_min}-${e.features[0].properties.lot_price_max}`)
            .addTo(map);
            });
             
            // Change the cursor to a pointer when
            // the mouse is over the states layer.
            map.on('mouseenter', 'states-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
            });
             
            // Change the cursor back to a pointer
            // when it leaves the states layer.
            map.on('mouseleave', 'states-layer', () => {
            map.getCanvas().style.cursor = '';
            });
        });
    }, [])

    return (
        <div ref={mapElement} style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0 }}>

        </div>
    )

}