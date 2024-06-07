import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

// Импортируем изображения
import layer1Icon from './imgs/1.jpg';
import layer2Icon from './imgs/2.jpg';
import layer3Icon from './imgs/3.jpg';
import peopleIcon from './imgs/people.jpg';
import valueIcon from './imgs/value.jpg';

import './MapComponent.css'

// Импортируем данные о слоях
import data from './layers.json';


export const MapComponent = () => {
    const [zoomLevel, setZoomLevel] = useState(0);
    const [markers, setMarkers] = useState<any>([]);
  
    const updateMarkers = (zoom:any) => {
      const filteredLayers = data.layers.filter((layer:any) => {
        if (zoom >= 11 && zoom <= 18) {
          return layer.zoom === 3;
        } else if (zoom >= 7 && zoom <= 10) {
          return layer.zoom === 2;
        } else if (zoom >= 4 && zoom <= 6) {
          return layer.zoom === 1;
        }
        return false;
      });
      setMarkers(filteredLayers);
    };
  
    useEffect(() => {
      updateMarkers(zoomLevel);
    }, [zoomLevel]);
  
    const ZoomHandler = () => {
      useMapEvents({
        zoomend: (e) => {
          setZoomLevel(e.target.getZoom());
        },
      });
      return null;
    };
  
    const createCustomIcon = (iconUrl:any, label:any) => {
      console.log(`Creating icon for: ${label}`);
      return L.divIcon({
        html: `
          <div style="display: flex; align-items: center; flex-direction: column;">
            <img src="${iconUrl}" alt="${label}" style="width: 30px; height: 30px;" />
            <span style="background: white; padding: 2px 5px; border-radius: 3px; font-size: 12px; margin-top: 5px;">
              ${label}
            </span>
          </div>
        `,
        className: '',
        iconSize: [30, 42],
        iconAnchor: [15, 42],
      });
    };
  
    const getIconForLayer = (zoom:any, name:any) => {
      if (zoom >= 4 && zoom <= 6) {
        return createCustomIcon(layer1Icon, name);
      } else if (zoom >= 7 && zoom <= 10) {
        return createCustomIcon(layer2Icon, name);
      } else if (zoom >= 11 && zoom <= 18) {
        return createCustomIcon(layer3Icon, name);
      }
      console.warn(`No icon found for zoom level ${zoom}`);
      return createCustomIcon(layer1Icon, name); // Фолбэк иконка
    };
  
    return (
      <div className="map-container">
        <MapContainer
          center={[53.214444, 63.624722]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <ZoomHandler />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution=''
          />
          {markers.map((marker:any, index:any) => (
            <Marker
              key={index}
              position={[marker.coordinates.latitude, marker.coordinates.longitude]}
              icon={getIconForLayer(zoomLevel, marker.name)}
            >
              <Popup>
                <div>
                  <h3>{marker.name}</h3>
                  <p>
                    <img src={peopleIcon} alt="People" style={{ width: '20px', marginRight: '5px' }} />
                    Население: {marker.population}
                  </p>
                  <p>
                    <img src={valueIcon} alt="Water Supply" style={{ width: '20px', marginRight: '5px' }} />
                    Обеспеченность водой: {marker.water_supply}%
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
}
