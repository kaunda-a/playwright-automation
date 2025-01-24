"use client";

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { LatLngExpression, LeafletMouseEvent } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LocationPickerProps {
  latitude: number;
  longitude: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<LocationPickerProps> = ({ latitude, longitude, onLocationChange }) => {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      onLocationChange(e.latlng.lat, e.latlng.lng);
    },
  });

  return <Marker position={[latitude, longitude]} />
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ latitude, longitude, onLocationChange }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isBrowser) {
    return null; // or a loading placeholder
  }

  const center: LatLngExpression = [latitude, longitude]

  return (
    <MapContainer center={center} zoom={13} style={{ height: '300px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker latitude={latitude} longitude={longitude} onLocationChange={onLocationChange} />
    </MapContainer>
  )
}
