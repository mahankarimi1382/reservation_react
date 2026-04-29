"use client";

import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import mapboxgl from "@neshan-maps-platform/mapbox-gl";
import axios from "axios";

export default function MapTest({ setPosition, position }) {
  const mapRef = useRef(null);
  console.log(position);
  const mapContainerRef = useRef(null);
  const [center, setCenter] = useState(position);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        mapType: mapboxgl.Map.mapTypes.neshanVector,
        container: mapContainerRef.current,
        zoom: 12,
        pitch: 0,
        center: center,
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

      const marker = new mapboxgl.Marker({ color: "#005DAD" })
        .setLngLat(center)
        .addTo(mapRef.current);

      mapRef.current.on("move", () => {
        const { lng, lat } = mapRef.current.getCenter();
        marker.setLngLat([lng, lat]);
        setMarkerPosition([lng, lat]);
        setPosition([lng, lat]);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [center]);

  const handleSearch = async (searchTerm) => {
    setDropdownVisible(true);
    const url = `https://api.neshan.org/v1/search?term=${searchTerm}&lat=${center[1]}&lng=${center[0]}`;
    const params = {
      headers: {
        "Api-Key": "service.c3a28bb8839f406a9a086a52c09c0e8d", // your api key here
      },
    };

    try {
      const response = await axios.get(url, params);
      if (response.data.count > 0) {
        setSearchResults(response.data.items);
      } else {
        setSearchResults([]);
        alert("No results found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleResultClick = (location) => {
    setCenter([location.x, location.y]);
    setMarkerPosition([location.x, location.y]);
    setPosition([location.x, location.y]);
    if (mapRef.current) {
      mapRef.current.flyTo({ center: [location.x, location.y], zoom: 12 });
    }
    setDropdownVisible(false);
  };

  const handleSaveLocation = () => {
    console.log(`Marker Position: ${markerPosition[1]}, ${markerPosition[0]}`);
  };

  return (
    <div dir="rtl" className=" flex-col flex justify-center gap-2 items-center">
      <div className=" w-full relative flex flex-col  items-center">
        {dropdownVisible && (
          <div className="absolute z-10 bg-white border mt-1 max-h-60 w-full overflow-auto">
            {searchResults.map((result, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleResultClick(result.location)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {result.title}
                </div>
              );
            })}
          </div>
        )}
        <div
          className="w-full h-full rounded-xl"
          style={{ height: "250px" }}
          ref={mapContainerRef}
        >
          map
        </div>
        <input
          type="text"
          onChange={(e) => {
            let searchTerm = e.target.value;
            if (searchTerm.length >= 3) {
              handleSearch(searchTerm);
            } else if (searchTerm.length <= 3) {
              setDropdownVisible(false);
            }
          }}
          placeholder="جستجو شهر,استان,خیابان و..."
          className=" absolute  w-[98%] z-50 bottom-1 p-2  rounded-xl "
        />
      </div>
      {/* <button
        onClick={handleSaveLocation}
        className="  rounded-lg w-full p-2 bg-[#005DAD] text-white"
      >
        ثبت موقعیت
      </button> */}
    </div>
  );
}
