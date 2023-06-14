import React from "react"
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { MapView } from "../components/MapView";

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJpYmZsb3JlcyIsImEiOiJjbGl1ZWY4aXIxbTZ4M2xud3B3MHhhZDJqIn0.KA55ocjjE8f3yGgzcejSKQ';

const Home = () => {

    return (
        <section>
            <MapView />
        </section>
    )
}

export default Home