import React, { useRef, useEffect } from "react";

import MapMarker from '../../../../assets/map-marker.png';
import "./Map.css";

const Map = (props) => {
    const mapRef = useRef();
    const {center,zoom} = props;

    useEffect( () =>{
       var map = new window.ol.Map({
            target: mapRef.current.id,
            layers: [
                new window.ol.layer.Tile({
                    source: new window.ol.source.OSM()
                })
            ],
            view: new window.ol.View({
                center: window.ol.proj.fromLonLat([center.lng,center.lat]),
                zoom: zoom
            })
        });
        //marker
        var iconFeature = new window.ol.Feature({
          geometry: new window.ol.geom.Point(
            window.ol.proj.fromLonLat([center.lng, center.lat])
          ),
        });

        var iconStyle = new window.ol.style.Style({
          image: new window.ol.style.Icon({
            anchor: [0.5, 0.5],
            src: MapMarker,
          }),
        });

        iconFeature.setStyle(iconStyle);

        var layer = new window.ol.layer.Vector({
          source: new window.ol.source.Vector({
            features: [
              iconFeature
            ],
          }),
        });
        map.addLayer(layer);
    }, [center,zoom]);

  return <div id="map" ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
