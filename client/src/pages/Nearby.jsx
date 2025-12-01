// Author : Manish Aggarwal

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Blue dot for user's live location (similar to Google Maps)
const blueDotIcon = L.divIcon({
  html: `
    <div style="
      width: 16px;
      height: 16px;
      background: #2D9CDB;
      border-radius: 50%;
      box-shadow: 0 0 0 6px rgba(45,155,219,0.25);
    "></div>
  `,
  className: "",
  iconSize: [16, 16],
});

// Fake recycling centers so the map always has meaningful data
const FAKE_CENTERS = [
  {
    name: "Green Earth Recycling Center",
    address_line1: "Aurobindo Marg",
    address_line2: "Green Park, Delhi 110016",
    lat: 28.5595,
    lon: 77.2010,
  },
  {
    name: "EcoWise E-Waste Collection Point",
    address_line1: "Siri Fort Road",
    address_line2: "South Ext II, Delhi 110049",
    lat: 28.5690,
    lon: 77.2165,
  },
  {
    name: "Delhi Plastic Recycling Hub",
    address_line1: "Press Enclave Marg",
    address_line2: "Saket, Delhi 110017",
    lat: 28.5283,
    lon: 77.2190,
  },
  {
    name: "NCR Waste Management Centre",
    address_line1: "Aruna Asaf Ali Marg",
    address_line2: "Vasant Kunj, Delhi 110070",
    lat: 28.5299,
    lon: 77.1505,
  },
  {
    name: "EcoCycle Paper Recycling Unit",
    address_line1: "Shivalik Road",
    address_line2: "Malviya Nagar, Delhi 110017",
    lat: 28.5350,
    lon: 77.2100,
  },
  {
    name: "Safdarjung Waste Sorting Center",
    address_line1: "Ring Road",
    address_line2: "Safdarjung, Delhi 110029",
    lat: 28.5625,
    lon: 77.2047,
  },
  {
    name: "EnviroTech Recycling Services",
    address_line1: "Outer Ring Road",
    address_line2: "Hauz Khas, Delhi 110016",
    lat: 28.5490,
    lon: 77.2053,
  },
  {
    name: "SmartRecycle Dry Waste Depot",
    address_line1: "Mandir Marg",
    address_line2: "RK Puram, Delhi 110022",
    lat: 28.5670,
    lon: 77.1831,
  },
  {
    name: "EcoBin Plastic Collection Spot",
    address_line1: "Andrews Ganj Road",
    address_line2: "Defence Colony, Delhi 110024",
    lat: 28.5685,
    lon: 77.2271,
  },
  {
    name: "Urban Reuse Scrap Yard",
    address_line1: "Baba Banda Singh Bahadur Setu",
    address_line2: "South Delhi 110013",
    lat: 28.5700,
    lon: 77.2400,
  },
];

// Green recycling icon used for all center markers
const centerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const Nearby = () => {
  // default location used until GPS loads
  const [coords, setCoords] = useState({
    lat: 28.5595,
    lon: 77.2010,
  });

  const [locationLoaded, setLocationLoaded] = useState(false);

  // tries to get user's real location first
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLocationLoaded(true);
      },
      () => {
        console.warn("Location access denied, using fallback.");
        setLocationLoaded(true);
      }
    );
  }, []);

  return (
    <div className="flex h-screen w-full pt-16">

      {/* left sidebar showing the list of centers */}
      <div className="w-[350px] bg-white shadow-xl overflow-y-auto p-5 border-r">
        <div className="pb-4 pt-6 px-2 border-b mb-4">
          <h2 className="text-2xl font-bold text-green-700">
            Nearby Recycling Centers
          </h2>
        </div>

        {FAKE_CENTERS.map((c, i) => (
          <div
            key={i}
            className="p-3 mb-4 border rounded-xl shadow hover:bg-gray-50 transition"
          >
            <h3 className="text-lg font-semibold">{c.name}</h3>
            <p className="text-sm text-gray-700">{c.address_line1}</p>
            <p className="text-sm text-gray-700">{c.address_line2}</p>
          </div>
        ))}
      </div>

      {/* interactive map on the right */}
      <div className="flex-1 z-1">
        {locationLoaded && (
          <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* user's live position shown with the blue dot */}
            <Marker position={[coords.lat, coords.lon]} icon={blueDotIcon}>
              <Popup>
                <strong>You are here</strong>
                <br />
                (GPS)
              </Popup>
            </Marker>

            {/* renders the fake recycling centers */}
            {FAKE_CENTERS.map((c, i) => (
              <Marker key={i} position={[c.lat, c.lon]} icon={centerIcon}>
                <Popup>
                  <strong>{c.name}</strong>
                  <br />
                  {c.address_line1}
                  <br />
                  {c.address_line2}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Nearby;
