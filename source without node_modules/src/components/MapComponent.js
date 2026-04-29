"use client";

import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

export default function MapComponent({ position }) {
  console.log(position)
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);

  const onInit = (neshanMap) => {
    new nmp_mapboxgl.Marker({ color: "#005DAD" })
      .setLngLat(position)
      .addTo(neshanMap);

    neshanMap.on("click", () => {
      setShowOptions(true); // نمایش گزینه‌ها
    });
  };

  const openNavigationApp = (app) => {
    const [lng, lat] = position;
    let url = "";

    switch (app) {
      case "google":
        url = `geo:${lat},${lng}?q=${lat},${lng}`; // باز کردن Google Maps
        break;
      case "waze":
        url = `waze://?ll=${lat},${lng}&navigate=yes`; // باز کردن Waze
        break;
      case "neshan":
        url = `neshan://navigate?lat=${lat}&lng=${lng}`; // باز کردن نشان
        break;
      default:
        url = `geo:${lat},${lng}?q=${lat},${lng}`; // باز کردن Google Maps

        break;
    }

    if (url) {
      window.location.href = url; // باز کردن اپلیکیشن با استفاده از URL Scheme
    }

    setShowOptions(false); // بستن دیالوگ
  };

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        mapType: mapboxgl.Map.mapTypes.neshanVector,
        container: mapContainerRef.current,
        zoom: 12,
        pitch: 0,
        center: position,
        minZoom: 2,
        maxZoom: 21,

        trackResize: true,
        mapKey: "web.3c1e919c4bbd46549db529eb9dd0b31b",
        poi: false,
        traffic: false,
        mapTypeControllerOptions: {
          show: false,
        },
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      onInit(mapRef.current);
    }
  }, []);

  return (
    <div className="w-full h-full rounded-xl relative">
      <div
        onClick={openNavigationApp}
        className="w-full h-full rounded-xl"
        ref={mapContainerRef}
      ></div>
    </div>
  );
}
